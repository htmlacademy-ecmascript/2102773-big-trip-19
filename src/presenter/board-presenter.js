import { render, RenderPosition } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import TripEventsView from '../view/trip-events-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FiltersView from '../view/filters-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { generateFilter } from '../mock/filter.js';

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

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripPointComponent = new TripPointView ({
      point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const tripEditFormComponent = new EditFormView ({
      point,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      this.#boardComponent.element.replaceChild(tripEditFormComponent.element, tripPointComponent.element);
    }

    function replaceFormToPoint() {
      this.#boardComponent.element.replaceChild(tripPointComponent.element, tripEditFormComponent.element);
    }

    render (tripPointComponent, this.#boardComponent.element);
  }

  #renderBoard() {
    const filters = generateFilter(this.#boardPoints);
    render(new FiltersView({filters}), this.#filterContainer);

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
