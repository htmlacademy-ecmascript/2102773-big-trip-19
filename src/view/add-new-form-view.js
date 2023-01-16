import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../mock/const.js';
import { mockOffersByType as offersByType, mockDestinations as destinations } from '../mock/data.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const destinationsName = [];
destinations.forEach((mockDestination) => destinationsName.push(mockDestination.name));

function createNewFormTemplate(point) {

  const pointTypeDestination = point.destinations;
  const pointDestination = destinations.find((destination) => destination.id === pointTypeDestination.id);
  const pointDescription = pointDestination.description;
  const pointName = pointDestination.name;

  const pointTypeAllOffers = offersByType.find((offer) => offer.type === point.type);
  const pointTypeOffer = point.offers.find((offer) => offer.type === point.type);
  const pointTypesPicture = pointDestination.picture;

  const {type, dateFrom, dateTo, basePrice} = point;

  function createDestination () {
    return pointTypeDestination ? (`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${pointDescription}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pointTypesPicture.map(({src, description}) =>
        (`<img class="event__photo" src="${src}" alt="${description}">`
        )).join('')}
      </div>
    </div>
  </section>`) : '';
  }

  function createOffers () {
    return pointTypeAllOffers && pointTypeOffer ? (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${pointTypeAllOffers.offers.map(({title, price, id}) => {
        const checked = pointTypeOffer.id.includes(id) ? 'checked' : '';
        return (`<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${checked}>
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`);
      }
      ).join('')}
    </div>
  </section>`) : '';
  }

  function createHeader () {
    return (`<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${POINT_TYPES.map((typeOfList) =>
        (`<div class="event__type-item">
              <input id="event-type-${typeOfList}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeOfList}">
              <label class="event__type-label  event__type-label--${typeOfList}" for="event-type-${typeOfList}-1">${typeOfList}</label>
            </div>`
        )).join('')}
          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" autocomplete="off" required
      name="event-destination" value="${pointName}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${destinationsName.map((city) => (`<option value="${city}"></option>`)).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
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
  #datepicker = null;

  constructor ({point}) {
    super();
    this._setState(AddNewFormView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createNewFormTemplate(this._state);
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
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#nameChangeHandler);

    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);

    this.#setDatepicker();
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #nameChangeHandler = (evt) => {
    evt.preventDefault();
    const pointDestination = destinations.find((destination) => destination.name === evt.target.value);
    if (pointDestination) {
      this.updateElement({
        destinations: {
          ...this._state.destinations,
          name: evt.target.value,
          id: pointDestination.id,
        }
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
  };

  #setDatepicker() {

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  static parsePointToState(point) {
    return {...point,
    };
  }

  static parseStateToPoint(state) {
    return {...state,
    };
  }
}
