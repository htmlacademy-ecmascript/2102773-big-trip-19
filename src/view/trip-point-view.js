import {createElement} from '../render.js';
import {humanizePointDate, humanizePointTime, calculateTimeDifference} from '../utils.js';
import { mockOffersByType } from '../mock/data.js';

function createTripPointTemplate(point) {

  const pointTypeOffer = point.offers.find((offer) => offer.type === point.type);
  const pointTypeDestination = point.destinations.find((destination) => destination.id === point.id);
  const pointTypeAllOffers = mockOffersByType.find((offer) => offer.type === point.type);
  const pointName = pointTypeDestination.name;
  const {type, dateFrom, dateTo, basePrice, isFavorite} = point;


  function createOffer () {
    if (pointTypeAllOffers && pointTypeOffer !== undefined) {
      return pointTypeAllOffers.offers.map(({title, price, id}) => {
        if (pointTypeOffer.id.includes(id)) {return (`<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
        </li>`);
        }
      }
      ).join('');
    }
    else { return (`<li class="event__offer">
    <span class="event__offer-title">${'Нет опций'}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${'0'}</span>
    </li>`);
    }
  }

  const dateStart = humanizePointDate(dateFrom);
  const timeStart = humanizePointTime(dateFrom);
  const timeEnd = humanizePointTime(dateTo);
  const diffTime = calculateTimeDifference(dateTo, dateFrom);
  const favorite = isFavorite ? 'event__favorite-btn--active' : '';

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dateStart}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${pointName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
      </p>
      <p class="event__duration">${diffTime}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${createOffer()}
    </ul>
    <button class="event__favorite-btn ${favorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`);
}

export default class TripPointView {
  #element = null;
  #point = null;

  constructor ({point}) {
    this.#point = point;
  }

  get template() {
    return createTripPointTemplate(this.#point);
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
