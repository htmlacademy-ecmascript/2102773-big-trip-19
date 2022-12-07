import FiltersView from './view/filters-view.js';
import { render, RenderPosition } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoView from './view/trip-info-view.js';

const siteBodyElement = document.querySelector('.page-body');
const siteFiltersElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteSortElement = siteBodyElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: siteSortElement});
const siteTripInfoElement = siteBodyElement.querySelector('.trip-main');

render(new TripInfoView(), siteTripInfoElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteFiltersElement);

boardPresenter.init();
