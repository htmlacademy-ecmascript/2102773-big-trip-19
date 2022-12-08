import FiltersView from './view/filters-view.js';
import { render, RenderPosition } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoView from './view/trip-info-view.js';

const bodyElement = document.querySelector('.page-body');
const filtersElement = bodyElement.querySelector('.trip-controls__filters');
const sortElement = bodyElement.querySelector('.trip-events');
const tripInfoElement = bodyElement.querySelector('.trip-main');
const boardPresenter = new BoardPresenter({boardContainer: sortElement});

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersElement);

boardPresenter.init();
