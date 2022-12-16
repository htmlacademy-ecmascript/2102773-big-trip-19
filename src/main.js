import FiltersView from './view/filters-view.js';
import { render, RenderPosition } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import PointsModel from './model/points-model.js';

const bodyElement = document.querySelector('.page-body');
const filtersElement = bodyElement.querySelector('.trip-controls__filters');
const sortElement = bodyElement.querySelector('.trip-events');
const tripInfoElement = bodyElement.querySelector('.trip-main');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: sortElement,
  pointsModel,
});


render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersElement);

boardPresenter.init();
