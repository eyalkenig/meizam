import { Component, OnInit } from "@angular/core";
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { AppState, Fixture, Prediction, Host } from "../../../app.state";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "app-next-fixtures-container",
  templateUrl: "./next-fixtures.component.html",
  styleUrls: ["./next-fixtures.component.scss"],
})
export class NextFixturesComponent implements OnInit {
  @select([
    "data",
    "nextFixtures",
    "raw"]) readonly nextFixtures$: Observable<Fixture>;

  host: Host = { name: "" };
  showCreate = false;
  constructor(
    private actions: NextFixturesActions,
    private ngRedux: NgRedux<AppState>,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener.bind(this));
  }

  ngOnInit(): void {
    this.ngRedux.dispatch(this.actions.fetchNextFixtures());
  }

  resultSelected(prediction: Prediction): void {
    this.ngRedux.dispatch(this.actions.predictionSelected(prediction));
  }
  create(fixture: Fixture): void {
    this.ngRedux.dispatch(this.actions.createFixture(fixture));
  }

  firebaseAuthChangeListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.host.name = user.displayName;
      }
    });
  }
}
