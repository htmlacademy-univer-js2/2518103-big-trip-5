import PointListPresenter from './presenter/point-list-presenter.js';
import PointsModel from './model/points-model.js';

const tripControlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

new PointListPresenter({ tripControlFilters, tripEvents, pointsModel }).init();
