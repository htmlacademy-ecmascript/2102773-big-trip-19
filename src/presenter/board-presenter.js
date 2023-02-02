import { render, RenderPosition, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripEventsView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import LoadingErrorView from '../view/loading-error-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {filter} from '../utils/filter.js';
import { sortPointByPrice, sortPointByTime, sortPointByDate } from '../utils/data.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {

  #infoContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #loadingComponent = new LoadingView();
  #tripInfoComponent = null;
  #loadingErrorComponent = new LoadingErrorView();
  #filterModel = null;
  #boardComponent = new TripEventsView();
  #sortComponent = null;
  #emptyListComponent = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isLoadingError = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({infoContainer, boardContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#infoContainer = infoContainer;
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#boardComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointByTime);
      default:
        filteredPoints.sort(sortPointByDate);
    }

    return filteredPoints;
  }

  get pointsForInfo() {
    return this.#pointsModel.points.sort(sortPointByDate);
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  init() {
    this.#renderBoard();
  }

  createPoint({offers, destinations}) {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(offers, destinations);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.INIT_ERROR:
        this.#isLoadingError = true;
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripPoint(point, offers, destinations) {

    const pointPresenter = new TripPointPresenter ({
      pointListContainer: this.#boardComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderEmptyList () {
    this.#emptyListComponent = new ListEmptyView({
      filterType: this.#filterType
    });
    render(this.#emptyListComponent, this.#boardContainer);
  }

  #renderTripInfo (points, offers, destinations) {
    this.#tripInfoComponent = new TripInfoView({
      points: points,
      offersByType: offers,
      destinations: destinations,
    });
    render (this.#tripInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(points, offers, destinations) {
    points.forEach((point) => this.#renderTripPoint(point, offers, destinations));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #renderLoadingError() {
    render(this.#loadingErrorComponent, this.#boardContainer);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#newPointPresenter.destroy();
    remove(this.#sortComponent);
    remove(this.#tripInfoComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    const offers = this.offers;
    const destinations = this.destinations;
    const points = this.points;
    const pointsCount = points.length;
    const pointsForInfo = this.pointsForInfo;

    render(this.#boardComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#isLoadingError) {
      this.#renderLoadingError();
      return;
    }

    if (pointsCount === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderTripInfo(pointsForInfo, offers, destinations);
    this.#renderSort();
    this.#renderPoints(points, offers, destinations);
  }
}
