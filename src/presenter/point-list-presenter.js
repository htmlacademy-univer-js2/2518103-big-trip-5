import PointRouteListView from '../view/point-list-view.js';
import SortingView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { SORT_TYPES, ACTIONS, UPDATE_TYPES, FILTER_TYPES } from '../consts.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/point-utils.js';
import { filter } from '../utils/filter-utils.js';
import NewPointPresenter from './new-point-presenter.js';

export default class PointListPresenter {
  #pointsListComponent = new PointRouteListView();
  #tripEventsContainer = null;
  #pointsListModel = null;
  #emptyPointListComponent = null;
  #destinations = null;
  #offers = null;
  #sortComponent = null;
  #currentSortType = SORT_TYPES.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;
  #filterModel = null;
  #isCreating = false;
  #newPointButtonPresenter = null;
  #newPointPresenter = null;
  #pointPresenters = new Map();

  constructor({ filterModel, tripEvents, pointsListModel, newPointButtonPresenter }) {
    this.#tripEventsContainer = tripEvents;
    this.#filterModel = filterModel;
    this.#pointsListModel = pointsListModel;
    this.#offers = this.#pointsListModel.offers;
    this.#destinations = this.#pointsListModel.destinations;
    this.#newPointButtonPresenter = newPointButtonPresenter;

    this.#pointsListModel.addObserver(this.#updatePointsList);
    this.#filterModel.addObserver(this.#updatePointsList);

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#pointsListComponent.element,
      pointsModel: this.#pointsListModel,
      onDataChange: this.#changePointsList,
      onDestroy: this.#destroyNewPoint,
    });
  }

  init() {
    this.#renderSort();
    this.#renderList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      destinations: this.#destinations,
      offers: this.#offers,
      pointsListComponent: this.#pointsListComponent,
      updateData: this.#changePointsList,
      changeMode: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #changePointsList = (action, updateType, update) => {
    switch (action) {
      case ACTIONS.UPDATE_POINT:
        this.#pointsListModel.updatePoint(updateType, update);
        break;
      case ACTIONS.DELETE_POINT:
        this.#pointsListModel.deletePoint(updateType, update);
        break;
      case ACTIONS.ADD_POINT:
        this.#pointsListModel.addPoint(updateType, update);
        break;
    }
  };

  #updatePointsList = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UPDATE_TYPES.MINOR:
        this.#clearPointsList();
        this.#renderList();
        break;
      case UPDATE_TYPES.MAJOR:
        this.#clearPointsList(true);
        this.#renderList();
        break;
    }
  };

  onNewPointButtonClick = () => {
    this.#isCreating = true;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #destroyNewPoint = ({ isCanceled }) => {
    this.#isCreating = false;
    this.#newPointButtonPresenter.enableButton();
    if (this.points.length === 0 && isCanceled) {
      this.#clearPointsList();
      this.#renderList();
    }
  };

  #clearPointsList = (resetSortType = false) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();

    if (this.#emptyPointListComponent) {
      remove(this.#emptyPointListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.DAY;
      this.#renderSort();
    }
  };

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderSort();
    this.#renderList();
  };

  #sortPoints(points, sortType) {
    switch (sortType) {
      case SORT_TYPES.PRICE:
        points.sort(sortByPrice);
        break;
      case SORT_TYPES.TIME:
        points.sort(sortByTime);
        break;
      default:
        points.sort(sortByDay);
    }
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
    const filteredPoints = this.points;
    if (filteredPoints.length) {
      this.#sortPoints(filteredPoints, this.#currentSortType);
      filteredPoints.forEach((point) => this.#renderPoint(point));
    } else {
      this.#renderEmptyList();
    }
  }

  #renderEmptyList() {
    this.#emptyPointListComponent = new EmptyListView({ filterType: this.#filterType });
    render(this.#emptyPointListComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    return filter[this.#filterType](this.#pointsListModel.points);
  }
}
