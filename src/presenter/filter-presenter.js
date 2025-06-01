import FilterView from '../view/filter-view.js';
import { FilterType, UpdateType } from '../consts.js';
import { pointsFilters } from '../utils/filter-utils.js';
import { render, replace } from '../framework/render.js';

export default class FilterPresenter {
  #container;
  #filterModel;
  #pointsListModel;
  #component;

  constructor({ containerElement, filterModel, pointsListModel }) {
    this.#container = containerElement;
    this.#filterModel = filterModel;
    this.#pointsListModel = pointsListModel;

    this.#filterModel.addObserver(this.#modelChangeHandler);
    this.#pointsListModel.addObserver(this.#modelChangeHandler);
  }

  init() {
    const previusComponent = this.#component;
    this.#component = new FilterView({
      filters: Object.values(FilterType).map((filterType) => ({
        filterType,
        isDisabled: pointsFilters[filterType](this.#pointsListModel.points).length === 0
      })),
      currentFilterType: this.#filterModel.currentFilterType,
      filterTypeChangeHandler: this.#filterTypeChangeHandler,
    });

    if (!previusComponent) {
      render(this.#component, this.#container);
    } else {
      replace(this.#component, previusComponent);
    }
  }

  #filterTypeChangeHandler = (filterType) => this.#filterModel.setFilter(UpdateType.MAJOR, filterType);

  #modelChangeHandler = () => this.init();
}
