import FiltersView from '../view/filter-view.js';
import PointRouteListView from '../view/point-list-view.js';
import SortingView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common-utils.js';
import { SORT_TYPES } from '../consts.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/point-utils.js';
import { generateFilter } from '../mock/filters-mock.js';

export default class PointListPresenter {
  #pointsListComponent = new PointRouteListView();
  #filtersContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #points = null;
  #filters = null;
  #sortComponent = null;
  #currentSortType = SORT_TYPES.DAY;
  #pointPresenters = new Map();

  constructor({ tripControlFilters, tripEvents, pointsModel }) {
    this.#tripEventsContainer = tripEvents;
    this.#filtersContainer = tripControlFilters;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = this.#pointsModel.points;
    this.#filters = generateFilter(this.#points);

    this.#renderFilters();
    this.#renderSort();
    this.#renderList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListComponent: this.#pointsListComponent,
      changeDataOnFavorite: this.#onFavoriteBtnClick,
      changeMode: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #onFavoriteBtnClick = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#renderSort();
    this.#clearPointsList();
    this.#renderList();
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SORT_TYPES.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SORT_TYPES.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        this.#points.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    if (this.#sortComponent !== null) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortingView({
      onSortTypeChange: this.#onSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderList() {
    render(this.#pointsListComponent, this.#tripEventsContainer);

    if (this.#points.length) {
      this.#sortPoints(this.#currentSortType);
      this.#points.forEach((point) => this.#renderPoint(point));
    } else {
      this.#renderNoPoints();
    }
  }

  #renderNoPoints() {
    render(new EmptyListView(), this.#pointsListComponent);
  }

  #renderFilters() {
    render(new FiltersView({ filters: this.#filters }), this.#filtersContainer);
  }
}
