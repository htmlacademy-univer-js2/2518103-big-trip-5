import Presenter from './presenter/main-presenter';
import PointsModel from './model/points-model';

const tripControlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const presenter = new Presenter(tripControlFilters, tripEvents, pointsModel);

presenter.init();
