import {remove, render, RenderPosition} from '../framework/render.js';
import AddNewFormView from '../view/add-new-form-view.js';
//import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../mock/const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #tripAddFormComponent = null;

  #offersByType = null;
  #destinations = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    // this.#offersByType = offersByType;
    // this.#destinations = destinations;
  }

  init(offersByType, destinations) {
    this.#offersByType = offersByType;
    this.#destinations = destinations;

    if (this.#tripAddFormComponent !== null) {
      return;
    }
    this.#tripAddFormComponent = new AddNewFormView({
      offersByType: this.#offersByType,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick
    });
    render(this.#tripAddFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#tripAddFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#tripAddFormComponent);
    this.#tripAddFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
