import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES, NEW_POINT } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createNewFormTemplate(data, offersByType, destinations) {
  const destinationsName = [];
  destinations.forEach((destination) => destinationsName.push(destination.name));

  const validName = `^(${destinationsName.join('|')})$`;

  const pointTypeDestination = data.destination;
  const pointDestination = destinations.find((destination) => destination.id === pointTypeDestination);

  const pointTypeAllOffers = offersByType.find((offer) => offer.type === data.type);
  const pointTypeOffer = data.offers;

  const {type, dateFrom, dateTo, basePrice, isDisabled, isSaving} = data;
  const isSubmitDisabled = (((dateFrom && dateTo) === undefined) || ((dateFrom && dateTo) === ''));

  function createDestination () {
    if (pointTypeDestination && pointDestination) {
      const pointDescription = pointDestination.description;
      const pointTypesPictures = pointDestination.pictures;
      return (`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${pointDescription}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pointTypesPictures.map(({src, description}) =>
          (`<img class="event__photo" src="${src}" alt="${description}">`
          )).join('')}
      </div>
    </div>
  </section>`);}
    return '';
  }

  function createOffers () {
    return pointTypeAllOffers && pointTypeAllOffers.offers.length ? (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${pointTypeAllOffers.offers.map(({title, price, id}) => {
        const checked = pointTypeOffer.includes(id) ? 'checked' : '';
        return (`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}"
        value="${id}" ${checked} ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`);
      }
      ).join('')}
    </div>
  </section>`) : (`<section class="event__section  event__section--offers" hidden>
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  </section>`);
  }

  function createHeader () {

    return (`<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${POINT_TYPES.map((typeOfList) => {
        const checkType = () => (typeOfList === type) ? 'checked' : '';
        return (`<div class="event__type-item">
            <input id="event-type-${typeOfList}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeOfList}" ${checkType()}>
            <label class="event__type-label  event__type-label--${typeOfList}" for="event-type-${typeOfList}-1">${typeOfList}</label>
          </div>`
        );
      }
      ).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" value="${(pointTypeDestination && pointDestination) ? pointDestination.name : ''}" placeholder="Сity name" type="text" autocomplete="off"
      name="event-destination" required pattern="${validName}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-1">
      ${destinationsName.map((city) => (`<option value="${city}"></option>`)).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${(dateFrom) ? dateFrom : ''}" ${isDisabled ? 'disabled' : ''}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${(dateTo) ? dateTo : ''}" ${isDisabled ? 'disabled' : ''}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" required name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>
    ${isSaving ? 'Saving...' : 'Save'}
    </button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>`);
  }

  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    ${createHeader()}
    <section class="event__details">
      ${createOffers()}
      ${createDestination()}
    </section>
  </form>
</li>`
  );
}

export default class AddNewFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #offersByType = null;
  #destinations = null;
  #handleCancelClick = null;
  #datepicker = null;

  constructor ({point = NEW_POINT, offersByType, destinations, onFormSubmit, onCancelClick}) {
    super();
    this._setState(AddNewFormView.parsePointToState(point));
    this.#offersByType = offersByType;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;
    this._restoreHandlers();
  }

  get template() {
    return createNewFormTemplate(this._state, this.#offersByType, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(point) {
    this.updateElement(
      AddNewFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#nameChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);

    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);

    this.#setDatepicker();
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #nameChangeHandler = (evt) => {
    evt.preventDefault();
    const pointDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    if (pointDestination !== undefined) {
      this.updateElement({
        destination: pointDestination.id,
      });
    }
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const index = this._state.offers.findIndex((offers) => String(offers) === evt.target.value);

    if (index !== -1) {
      this._state.offers = [
        ...this._state.offers.slice(0, index),
        ...this._state.offers.slice(index + 1),
      ];
    }
    else {
      this._state.offers = [
        Number(evt.target.value),
        ...this._state.offers,
      ];
    }

    if (this._state.offers) {
      this.updateElement({
        ...this._state,
        offers: this._state.offers,
      });
    }
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(AddNewFormView.parseStateToPoint(this._state));
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #setDatepicker() {

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onClose: this.#dateFromChangeHandler,
        'time_24hr': true,
      },
    );

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#dateToChangeHandler,
        'time_24hr': true,
      },
    );
  }

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    return point;
  }
}
