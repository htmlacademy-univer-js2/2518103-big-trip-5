import Presenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';

const tripControlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

new Presenter({ tripControlFilters, tripEvents, pointsModel }).init();
