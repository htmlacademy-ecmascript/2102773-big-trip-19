import {remove, render, RenderPosition} from '../framework/render.js';
import AddNewFormView from '../view/add-new-form-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../mock/const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #tripAddFormComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#tripAddFormComponent !== null) {
      return;
    }
    this.#tripAddFormComponent = new AddNewFormView({
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
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...point},
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
