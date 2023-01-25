import Observable from '../framework/observable.js';
import {getRandomPoint} from '../mock/data.js';

const TRIP_POINTS_COUNT = 4;

export default class PointsModel extends Observable {
  #points = Array.from({length: TRIP_POINTS_COUNT}, getRandomPoint);
  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((points) => points.id === update.id);
    if (index !== -1) {
      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, update);
    }
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((points) => points.id === update.id);
    if (index !== -1) {
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType);
    }
  }
}
