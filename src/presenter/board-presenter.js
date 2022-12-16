import AddNewFormView from '../view/add-new-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import TripEventsView from '../view/trip-events-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new TripEventsView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.boardComponent.getElement());
    render(this.boardComponent, this.boardContainer);
    render(new EditFormView({point: this.boardPoints[0]}), this.boardComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new TripPointView({point: this.boardPoints[i]}), this.boardComponent.getElement());
    }

    render(new AddNewFormView({point: this.boardPoints[3]}), this.boardComponent.getElement());
  }
}
