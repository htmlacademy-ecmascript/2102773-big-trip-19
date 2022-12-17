import { createElement } from '../render.js';
import { humanizePointAddDate } from '../utils.js';
import { POINT_TYPES } from '../mock/const.js';
import { mockOffersByType } from '../mock/data.js';

function createEditFormTemplate(point) {

  const pointTypeDestination = point.destinations.find((destination) => destination.id === point.id);
  const pointName = pointTypeDestination.name;
  const pointDescription = pointTypeDestination.description;
  const pointTypeAllOffers = mockOffersByType.find((offer) => offer.type === point.type);
  const pointTypeOffer = point.offers.find((offer) => offer.type === point.type);

  const {type, dateFrom, dateTo, basePrice} = point;

  const dateStart = humanizePointAddDate(dateFrom);
  const dateEnd = humanizePointAddDate(dateTo);

  function createDestination () {
    return pointDescription ? (`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${pointDescription}</p>
  </section>`) : '';
  }

  function createOffers () {
    return pointTypeAllOffers && pointTypeOffer ? (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${pointTypeAllOffers.offers.map(({title, price, id}) => {
        const checked = pointTypeOffer.id.includes(id) ? 'checked' : '';
        return (`<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-2" type="checkbox" name="event-offer-${id}" ${checked}>
      <label class="event__offer-label" for="event-offer-${id}-2">
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
      <label class="event__type  event__type-btn" for="event-type-toggle-2">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-2" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${POINT_TYPES.map((typeOfList) =>
        (`<div class="event__type-item">
              <input id="event-type-${typeOfList}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeOfList}">
              <label class="event__type-label  event__type-label--${typeOfList}" for="event-type-${typeOfList}-1">${typeOfList}</label>
            </div>`
        )).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-2">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-2" type="text" name="event-destination" value="${pointName}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
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

export default class EditFormView {
  #element = null;
  #point = null;

  constructor ({point}) {
    this.#point = point;
  }

  get template() {
    return createEditFormTemplate(this.#point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
