import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const offers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;

      this.#points = points.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((points) => points.id === update.id);
    if (index !== -1) {
      try {
        const response = await this.#pointsApiService.updatePoint(update);
        const updatedPoint = this.#adaptToClient(response);
        this.#points = [
          ...this.#points.slice(0, index),
          updatedPoint,
          ...this.#points.slice(index + 1),
        ];
        this._notify(updateType, updatedPoint);
      } catch(err) {
        throw new Error('Can\'t update point');
      }
    }
  }

  async addPoint(updateType, update) {

    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }


  async deletePoint(updateType, update) {

    const index = this.#points.findIndex((points) => points.id === update.id);
    if (index !== -1) {
      try {
        await this.#pointsApiService.deletePoint(update);
        this.#points = [
          ...this.#points.slice(0, index),
          ...this.#points.slice(index + 1),
        ];
        this._notify(updateType);
      } catch(err) {
        throw new Error('Can\'t delete point');
      }
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
      basePrice: point['base_price'],
      //destinations: point['destination']
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['base_price'];
    //delete adaptedPoint['destination'];

    return adaptedPoint;
  }
}
