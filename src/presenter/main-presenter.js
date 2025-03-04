import Filter from '../view/filter-view';
import CreateForm from '../view/create-form-view';
import EditForm from '../view/edit-form-view';
import PointList from '../view/point-list-view';
import Point from '../view/point-view';
import Sort from '../view/sort-view';
import { render } from '../render';

const MAX_POINT_COUNT = 3;

export default class Presenter {
  PointListComponenet = new PointList();

  constructor(tripControlFilters, tripEvents, pointsModel) {
    this.tripEvents = tripEvents;
    this.tripControlFilters = tripControlFilters;
    this.pointsModel = pointsModel;
  }

  init() {
    this.allPoints = [...this.pointsModel.getPoints()];

    render(new Filter(), this.tripControlFilters);
    render(new Sort(), this.tripEvents);
    render(this.PointListComponenet, this.tripEvents);
    render(new EditForm({ point: this.allPoints[0] }), this.PointListComponenet.getElement());

    for (let i = 0; i < MAX_POINT_COUNT; i++) {
      render(new Point({ point: this.allPoints[i] }), this.PointListComponenet.getElement());
    }

    render(new CreateForm(), this.PointListComponenet.getElement());
  }
}
