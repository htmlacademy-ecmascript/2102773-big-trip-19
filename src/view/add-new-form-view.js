import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../mock/const.js';
import { mockOffersByType as offersByType, mockDestinations as destinations } from '../mock/data.js';
import { getRandomArrayElement} from '../utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const NEW_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destinations: {
    id: '',
    description: 'описание 1',
    name: '',
    picture: [
      {
        src: 'http://picsum.photos/300/200?r=0.001',
        description: 'описание 1',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.002',
        description: 'описание 2',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.003',
        description: 'описание 3',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.004',
        description: 'описание 4',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.005',
        description: 'описание 5',
      }
    ]
  },
  isFavorite: false,
  offers: [
    {
      type: getRandomArrayElement(POINT_TYPES),
      id: ['1', '3']
    },
    {
      type: getRandomArrayElement(POINT_TYPES),
      id: ['2']
    },
    {
      type: getRandomArrayElement(POINT_TYPES),
      id: ['1', '2', '3']
    },
  ],
  type: POINT_TYPES[0],
};

const destinationsName = [];
destinations.forEach((destination) => destinationsName.push(destination.name));



function createNewFormTemplate(data) {

  //const pointTypeDestination = data.destinations;
  //const pointDestination = destinations.find((destination) => destination.id === pointTypeDestination.id);
  const pointDestination = data.destinations;
  //console.log(pointTypeDestination)
  console.log(pointDestination)
  const pointDescription = pointDestination.description;
  const pointName = pointDestination.name;
  console.log(pointName)
  console.log(data)



  const pointTypeAllOffers = offersByType.find((offer) => offer.type === data.type);
  const pointTypeOffer = data.offers.find((offer) => offer.type === data.type);
  const pointTypesPicture = pointDestination.picture;

  const {type, dateFrom, dateTo, basePrice} = data;

  function createDestination () {
    return pointDestination ? (`<section class="event__section  event__section--destination">
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
      <input class="event__input  event__input--destination" id="event-destination-1" value="${pointName}" placeholder="Название города" type="text" autocomplete="off"
      name="event-destination" required list="destination-list-1">
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
      <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${basePrice}">
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
  #handleFormSubmit = null;
  #handleCancelClick = null;
  #datepicker = null;

  constructor ({point = NEW_POINT, onFormSubmit, onCancelClick}) {
    super();
    this._setState(AddNewFormView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;
    this._restoreHandlers();
  }

  get template() {
    console.log(this._state)
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
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#nameChangeHandler);
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
    console.log(pointDestination)

    function validName () {
      const tru = destinationsName.includes(evt.target.value);
      console.log(this)
      if (tru) {
        console.log(tru)
        return evt.target.value;
      }
      else {
        console.log(this)
        return this.setCustomValidity('string')}
    }

    console.log(validName())

    if (pointDestination !== undefined) {
      this.updateElement({
        destinations: {
          //...this._state.destinations,
          //name: evt.target.value,
          name: validName(),
          id: pointDestination.id,
          description: pointDestination.description,
          picture: pointDestination.picture,
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
