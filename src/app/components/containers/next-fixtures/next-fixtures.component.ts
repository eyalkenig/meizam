import { Component, OnInit } from "@angular/core";
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";

import { AppState, Fixture } from "../../../app.state";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";

@Component({
  selector: "next-fixtures-container",
  templateUrl: "./next-fixtures.component.html",
  styleUrls: ["./next-fixtures.component.scss"],
})
export class NextFixturesComponent implements OnInit {
  @select([
    "data",
    "nextFixtures",
    "raw"]) readonly nextFixtures$: Observable<Fixture>;

  constructor(
    private actions: NextFixturesActions,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit(): void {
    this.ngRedux.dispatch(this.actions.fetchNextFixtures());
  }
}
