import { render, RenderPosition, remove } from '../framework/render.js';
import TripEventsView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {filter} from '../utils/filter.js';
import { sortPointByPrice, sortPointByTime, sortPointByDate } from '../utils/data.js';
import { SortType, UpdateType, UserAction, FilterType } from '../mock/const.js';

export default class BoardPresenter {

  #infoContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #loadingComponent = new LoadingView();
  #filterModel = null;
  #boardComponent = new TripEventsView();
  #sortComponent = null;
  #emptyListComponent = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;


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

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  init({offers, destinations}) {
    this.#renderBoard(offers, destinations);
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

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
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

  #renderTripInfo () {
    render(new TripInfoView({point: this.points}), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(points, offers, destinations) {
    points.forEach((point) => this.#renderTripPoint(point, offers, destinations));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#newPointPresenter.destroy();
    remove(this.#sortComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }


  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const offers = this.offers;
    const destinations = this.destinations;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderEmptyList();
      return;
    }

    //this.#renderTripInfo();

    this.#renderSort();
    this.#renderPoints(points, offers, destinations);
  }
}
