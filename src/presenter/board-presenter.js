import { render, RenderPosition } from '../framework/render.js';
import TripEventsView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FiltersView from '../view/filters-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import { generateFilter } from '../mock/filter.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {

  #filterContainer = null;
  #infoContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #boardComponent = new TripEventsView();
  #sortComponent = new SortView();
  #emptyListComponent = new ListEmptyView();

  #boardPoints = [];
  #pointPresenter = new Map();

  constructor({infoContainer, filterContainer, boardContainer, pointsModel}) {
    this.#infoContainer = infoContainer;
    this.#filterContainer = filterContainer;
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort() {
    render(this.#sortComponent, this.#boardComponent.element);
  }

  #renderTripPoint(point) {

    const pointPresenter = new TripPointPresenter ({
      pointListContainer: this.#boardComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderEmptyList () {
    render(this.#emptyListComponent, this.#boardContainer);
  }

  #renderTripInfo () {
    render(new TripInfoView({point: this.#boardPoints}), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilters () {
    const filters = generateFilter(this.#boardPoints);
    render(new FiltersView({filters}), this.#filterContainer);
  }

  #clearTaskList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderTripPointList() {
    this.#boardPoints.forEach((boardPoint) => this.#renderTripPoint(boardPoint));
  }

  #renderBoard() {
    this.#renderFilters();

    if (this.#boardPoints.every((point) => point === null)) {
      this.#renderEmptyList();
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();
    render(this.#boardComponent, this.#boardContainer);
    this.#renderTripPointList();
  }
}
