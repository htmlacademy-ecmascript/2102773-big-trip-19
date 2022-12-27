import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate} from '../utils/data.js';

function createTripInfoTemplate(point) {
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
    const pointTypeDestination = point[i].destinations.find((destination) => destination.id === point[i].id);
    tripPointsName.push(pointTypeDestination.name);
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

  constructor ({point}) {
    super();
    this.#point = point;
  }

  get template() {
    return createTripInfoTemplate(this.#point);
  }
}
