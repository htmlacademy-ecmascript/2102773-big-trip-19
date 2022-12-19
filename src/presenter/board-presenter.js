import EditFormView from '../view/edit-form-view.js';
import TripEventsView from '../view/trip-events-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FiltersView from '../view/filters-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { render, RenderPosition } from '../render.js';

export default class BoardPresenter {
  #filterContainer = null;
  #infoContainer = null;
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new TripEventsView();

  #boardPoints = [];

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

  #renderTripPoint(point) {
    const tripPointComponent = new TripPointView({point});
    const tripEditFormComponent = new EditFormView({point});

    const replacePointToForm = () => {
      this.#boardComponent.element.replaceChild(tripEditFormComponent.element, tripPointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#boardComponent.element.replaceChild(tripPointComponent.element, tripEditFormComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    tripEditFormComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    tripEditFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render (tripPointComponent, this.#boardComponent.element);
  }

  #renderBoard() {
    render(new FiltersView(), this.#filterContainer);

    if (this.#boardPoints.every((point) => point === null)) {
      render(new ListEmptyView(), this.#boardContainer);
      return;
    }

    render(new TripInfoView(), this.#infoContainer, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.#boardComponent.element);
    render(this.#boardComponent, this.#boardContainer);

    this.#boardPoints.forEach((boardPoint) => this.#renderTripPoint(boardPoint));
  }
}
