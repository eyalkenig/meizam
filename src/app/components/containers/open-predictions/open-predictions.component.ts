import { Component, OnInit } from "@angular/core";
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";

import { AppState, Fixture, Prediction } from "../../../app.state";
import { OpenPredictionsActions } from "app/components/containers/open-predictions/open-predictions.actions";

@Component({
  selector: "app-open-predictions-container",
  templateUrl: "./open-predictions.component.html",
  styleUrls: ["./open-predictions.component.scss"],
})
export class OpenPredictionsComponent implements OnInit {
  @select([
    "data",
    "openPredictions",
    "raw"]) readonly openPredictions$: Observable<Prediction>;

  constructor(
    private actions: OpenPredictionsActions,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit(): void {
    this.ngRedux.dispatch(this.actions.fetchOpenPredictions());
  }
}
