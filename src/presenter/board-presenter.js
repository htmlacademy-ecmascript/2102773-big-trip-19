import AddNewFormView from '../view/add-new-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import TripEventsView from '../view/trip-events-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

const TRIP_POINTS_COUNT = 3;

export default class BoardPresenter {
  boardComponent = new TripEventsView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardComponent.getElement());
    render(this.boardComponent, this.boardContainer);
    render(new EditFormView(), this.boardComponent.getElement());

    for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
      render(new TripPointView(), this.boardComponent.getElement());
    }

    render(new AddNewFormView(), this.boardComponent.getElement());
  }
}
