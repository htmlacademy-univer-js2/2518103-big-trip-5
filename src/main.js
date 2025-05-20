import PointListPresenter from './presenter/point-list-presenter.js';
import PointsListModel from './model/points-list-model.js';

const tripControlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const pointsListModel = new PointsListModel();

new PointListPresenter({ tripControlFilters, tripEvents, pointsListModel }).init();
