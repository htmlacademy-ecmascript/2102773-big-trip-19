import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate} from '../utils/data.js';

function createTripInfoTemplate(point, offersByType, destinations) {

  const start = humanizePointDate(point[0].dateFrom);
  const finish = humanizePointDate(point[point.length - 1].dateTo);

  function countPriceSum() {
    let priceSum = 0;
    for (let i = 0; i < point.length; i++) {
      priceSum += point[i].basePrice;
    }
    return priceSum;
  }

  const tripPointsName = [];
  for (let i = 0; i < point.length; i++) {
    const pointTypeDestination = point[i].destination;
    const pointDestination = destinations.find((destination) => destination.id === pointTypeDestination);
    tripPointsName.push(pointDestination.name);
  }


  function createPointsInfo () {
    if (tripPointsName.length > 3) {
      return (`<h1 class="trip-info__title">${tripPointsName[0]} &mdash; ... &mdash;  ${tripPointsName[tripPointsName.length - 1]}</h1>`);
    }
    return (`<h1 class="trip-info__title">${tripPointsName[0]} &mdash; ${tripPointsName[1]} &mdash; ${tripPointsName[2]}</h1>`);
  }

  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${createPointsInfo()}

    <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${finish}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${countPriceSum()}</span>
  </p>
</section>`);
}

export default class TripInfoView extends AbstractView {
  #point = null;
  #offersByType = null;
  #destinations = null;

  constructor ({point, offersByType, destinations}) {
    super();
    this.#point = point;
    this.#offersByType = offersByType;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#point, this.#offersByType, this.#destinations);
  }
}
