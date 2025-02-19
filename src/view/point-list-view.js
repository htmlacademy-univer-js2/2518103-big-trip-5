import { createElement } from '../render';

function craetePointListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class PointList {
  getTemplate() {
    return craetePointListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
