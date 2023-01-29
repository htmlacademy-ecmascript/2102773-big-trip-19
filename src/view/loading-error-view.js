import AbstractView from '../framework/view/abstract-view.js';

function createLoadingErrorTemplate() {
  return (
    `<p class="trip-events__msg">
    Loading error. Try to upgrade later
    </p>`
  );
}

export default class LoadingErrorView extends AbstractView {
  get template() {
    return createLoadingErrorTemplate();
  }
}
