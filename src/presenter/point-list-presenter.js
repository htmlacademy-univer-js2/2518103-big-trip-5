import FiltersView from '../view/filter-view.js';
import PointRouteListView from '../view/point-list-view.js';
import SortingView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { render } from '../framework/render.js';
import { updatePoint } from '../utils/point-utils.js';
import { generateFilter } from '../mock/filters-mock.js';

export default class PointListPresenter {
  #pointRouteListPart = new PointRouteListView();
  #tripControlFilters = null;
  #tripEventsPart = null;
  #pointsModel = null;
  #allPoints = null;
  #pointPresenters = new Map();

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #onFavoriteBtnClick = (updatedPoint) => {
    this.#allPoints = updatePoint(this.#allPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  constructor({ tripControlFilters, tripEvents, pointsModel }) {
    this.#tripEventsPart = tripEvents;
    this.#tripControlFilters = tripControlFilters;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#allPoints = this.#pointsModel.points;

    const currentFilters = generateFilter(this.#allPoints);

    if (this.#allPoints.length > 0) {
      render(new FiltersView({ currentFilters }), this.#tripControlFilters);
      render(new SortingView(), this.#tripEventsPart);
      render(this.#pointRouteListPart, this.#tripEventsPart);

      this.#allPoints.forEach((point) => this.#renderPoint(point));
    } else {
      render(new EmptyListView(), this.#tripEventsPart);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListComponent: this.#pointRouteListPart,
      changeDataOnFavorite: this.#onFavoriteBtnClick,
      changeMode: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
