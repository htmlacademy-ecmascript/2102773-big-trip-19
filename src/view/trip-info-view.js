import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate} from '../utils/data.js';

function countPrice(points) {
  let priceSum = 0;
  for (const point of points) {
    priceSum += point.basePrice;
  }
  return priceSum;
}

function countOffersPrice (points, offersByType) {
  let offersTotalPrice;
  const offersPrices = [];

  for (const point of points) {
    const pointTypeOffer = point.offers;
    const pointTypeAllOffers = offersByType.find((offer) => offer.type === point.type);

    if (pointTypeAllOffers && pointTypeOffer.length !== 0) {
      pointTypeAllOffers.offers.map(({price, id}) => {
        if (pointTypeOffer.includes(id)) {
          offersPrices.push(price);
          return offersPrices;
        }
      }
      );
    }
    if (offersPrices.length === 0) {
      offersTotalPrice = 0;
    }
    else {
      offersTotalPrice = offersPrices.reduce((total, amount) => total + amount);
    }
  }
  return offersTotalPrice;
}

function createPointsNameInfo (points, destinations) {
  const tripPointsName = [];

  for (const point of points) {
    const pointTypeDestination = point.destination;
    const pointDestination = destinations.find((destination) => destination.id === pointTypeDestination);
    tripPointsName.push(pointDestination.name);
  }

  switch (tripPointsName.length) {
    case 1:
      return (`<h1 class="trip-info__title">${tripPointsName[0]}</h1>`);
    case 2:
      return (`<h1 class="trip-info__title">${tripPointsName[0]} &mdash; ${tripPointsName[1]}</h1>`);
    case 3:
      return (`<h1 class="trip-info__title">${tripPointsName[0]} &mdash; ${tripPointsName[1]} &mdash; ${tripPointsName[2]}</h1>`);
    default:
      return (`<h1 class="trip-info__title">${tripPointsName[0]} &mdash; ... &mdash;  ${tripPointsName[tripPointsName.length - 1]}</h1>`);
  }
}

function createTripInfoTemplate(points, offersByType, destinations) {

  const start = humanizePointDate(points[0].dateFrom);
  const finish = humanizePointDate(points[points.length - 1].dateTo);

  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${createPointsNameInfo(points, destinations)}

    <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${finish}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${countPrice(points) + countOffersPrice(points, offersByType)}</span>
  </p>
</section>`);
}

export default class TripInfoView extends AbstractView {
  #points = null;
  #offersByType = null;
  #destinations = null;

  constructor ({points, offersByType, destinations}) {
    super();
    this.#points = points;
    this.#offersByType = offersByType;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#offersByType, this.#destinations);
  }
}
