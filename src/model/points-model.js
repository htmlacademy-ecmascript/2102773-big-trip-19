import {getRandomPoint} from '../mock/data.js';

const TRIP_POINTS_COUNT = 4;

export default class PointsModel {
  points = Array.from({length: TRIP_POINTS_COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
