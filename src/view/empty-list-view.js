import { EMPTY_LIST_MESSAGES } from '../consts.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createEmptyListTemplate = (filterType) => `<p class="trip-events__msg">${EMPTY_LIST_MESSAGES[filterType]}</p>`;

export default class EmptyListView extends AbstractStatefulView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
