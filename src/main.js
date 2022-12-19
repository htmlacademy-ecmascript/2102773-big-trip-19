import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const bodyElement = document.querySelector('.page-body');
const filtersElement = bodyElement.querySelector('.trip-controls__filters');
const sortElement = bodyElement.querySelector('.trip-events');
const tripInfoElement = bodyElement.querySelector('.trip-main');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  infoContainer: tripInfoElement,
  filterContainer: filtersElement,
  boardContainer: sortElement,
  pointsModel,
});

boardPresenter.init();
