import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic asdrt249lqzytr';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip/';

const bodyElement = document.querySelector('.page-body');
const filtersElement = bodyElement.querySelector('.trip-controls__filters');
const sortElement = bodyElement.querySelector('.trip-events');
const tripInfoElement = bodyElement.querySelector('.trip-main');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  infoContainer: tripInfoElement,
  boardContainer: sortElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint(pointsModel);
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
boardPresenter.init();
pointsModel.init().finally(() => {
  render (newPointButtonComponent, tripInfoElement);
});
