import { addPreloader, removePreloader } from './preloader.js';
import { API_URL } from './vars.js';

const service = () => {
  const renderPrice = (wrapper, data) => {
    data.forEach((item) => {
      const priceItem = document.createElement('li');
      priceItem.classList.add('price__item');

      priceItem.innerHTML = `
        <span class="price__item-title">${item.name}</span><span class="price__item-count">${item.price} руб</span>
      `;

      wrapper.append(priceItem);
    });
  };

  const renderService = (wrapper, data) => {
    const labels = data.map((item) => {
      const label = document.createElement('label');
      label.className = 'radio';
      label.innerHTML = `
        <input type="radio" class="radio__input" name="service" value="${item.id}">
        <span class="radio__label">${item.name}</span>
      `;
      return label;
    });

    wrapper.append(...labels);
  };

  const initService = () => {
    const priceList = document.querySelector('.price__list');
    const reserveFieldsetService = document.querySelector(
      '.reserve__fieldset_service',
    );
    priceList.textContent = '';

    addPreloader(priceList);

    reserveFieldsetService.innerHTML = `<legend class="reserve__legend">Услуга</legend>`;

    fetch(`${API_URL}/api`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        renderPrice(priceList, data);
        removePreloader(priceList);
        return data;
      })
      .then((data) => {
        renderService(reserveFieldsetService, data);
        removePreloader(reserveFieldsetService);
      });
  };
  initService();

  const addDisabled = (arr) => {
    arr.forEach((elem) => {
      elem.disabled = true;
    });
  };

  const removeDisabled = (arr) => {
    arr.forEach((elem) => {
      elem.disabled = false;
    });
  };

  const renderSpec = (wrapper, data) => {
    const labels = data.map((item) => {
      const label = document.createElement('label');
      label.className = 'radio';
      label.innerHTML = `
        <input type="radio" class="radio__input" name="spec" value="${item.id}">
        <span class="radio__label radio__label_spec" style="--bg-image: url(${API_URL}/${item.img})">${item.name}</span>
      `;
      return label;
    });

    wrapper.append(...labels);
  };

  const renderMonth = (wrapper, data) => {
    const labels = data.map((month) => {
      const label = document.createElement('label');
      label.className = 'radio';
      label.innerHTML = `
        <input type="radio" class="radio__input" name="month" value="${month}">
        <span class="radio__label">${new Intl.DateTimeFormat('ru-RU', {
          month: 'long',
        }).format(new Date(month))}</span>
      `;
      return label;
    });

    wrapper.append(...labels);
  };

  const renderDay = (wrapper, data, month) => {
    const labels = data.map((day) => {
      const label = document.createElement('label');
      label.className = 'radio';
      label.innerHTML = `
        <input type="radio" class="radio__input" name="day" value="${day}">
        <span class="radio__label">${new Intl.DateTimeFormat('ru-RU', {
          month: 'long',
          day: 'numeric',
        }).format(new Date(`${month}/${day}`))}</span>
      `;
      return label;
    });

    wrapper.append(...labels);
  };

  const renderTime = (wrapper, data) => {
    data.sort((a, b) => (a > b ? 1 : -1));
    const labels = data.map((time) => {
      const label = document.createElement('label');
      label.className = 'radio';
      label.innerHTML = `
        <input type="radio" class="radio__input" name="time" value="${time}">
        <span class="radio__label">${time}</span>
      `;
      return label;
    });

    wrapper.append(...labels);
  };

  const initReserve = () => {
    const reserveForm = document.querySelector('.reserve__form');
    const {
      fieldservice,
      fieldspec,
      fielddate,
      fieldmonth,
      fieldday,
      fieldtime,
      btn,
    } = reserveForm;

    addDisabled([fieldspec, fielddate, fieldmonth, fieldday, fieldtime, btn]);

    reserveForm.addEventListener('change', async ({ target }) => {
      if (target.name === 'service') {
        addDisabled([
          fieldspec,
          fielddate,
          fieldmonth,
          fieldday,
          fieldtime,
          btn,
        ]);
        fieldspec.innerHTML = `<legend class="reserve__legend">Специалист</legend>`;
        addPreloader(fieldspec);

        const response = await fetch(`${API_URL}/api?service=${target.value}`);
        const data = await response.json();

        renderSpec(fieldspec, data);

        removePreloader(fieldspec);
        removeDisabled([fieldspec]);
      }

      if (target.name === 'spec') {
        addDisabled([fielddate, fieldmonth, fieldday, fieldtime, btn]);
        addPreloader(fieldmonth);

        const response = await fetch(
          `${API_URL}/api?spec=${reserveForm.spec.value}`,
        );
        const data = await response.json();

        fieldmonth.textContent = '';
        renderMonth(fieldmonth, data);

        removePreloader(fieldmonth);
        removeDisabled([fielddate, fieldmonth]);
      }

      if (target.name === 'month') {
        addDisabled([fieldday, fieldtime, btn]);
        addPreloader(fieldday);

        const response = await fetch(
          `${API_URL}/api?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}`,
        );
        const data = await response.json();

        fieldday.textContent = '';
        renderDay(fieldday, data, reserveForm.month.value);

        removePreloader(fieldday);
        removeDisabled([fieldday]);
      }

      if (target.name === 'day') {
        addDisabled([fieldtime, btn]);
        addPreloader(fieldtime);

        const response = await fetch(
          `${API_URL}/api?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}&day=${target.value}`,
        );
        const data = await response.json();

        fieldtime.textContent = '';
        renderTime(fieldtime, data);

        removePreloader(fieldtime);
        removeDisabled([fieldtime]);
      }

      if (target.name === 'time') {
        removeDisabled([btn]);
      }
    });

    reserveForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(reserveForm);
      const json = JSON.stringify(Object.fromEntries(formData));

      const response = await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        body: json,
      });

      const data = await response.json();
      addDisabled([
        fieldservice,
        fieldspec,
        fielddate,
        fieldmonth,
        fieldday,
        fieldtime,
        btn,
      ]);

      const p = document.createElement('p');
      p.className = 'reserve__success';
      p.innerHTML = `
        Спасибо за бронь #<strong>${data.id}</strong>!<br>
        Ждём вас <strong>${new Intl.DateTimeFormat('ru-RU', {
          month: 'long',
          day: 'numeric',
        }).format(new Date(`${data.month}/${data.day}`))}</strong>, 
        время: <strong>${data.time}</strong>.
      `;
      reserveForm.append(p);
    });
  };
  initReserve();
};

export default service;
