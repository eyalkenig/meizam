import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState, Fixture, Prediction } from "app/app.state";
import { environment } from "environments/environment";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthenticationService } from "app/services/authentication.service";
import { User } from "firebase/app";
import { ApiService } from "app/services/api.service";

@Injectable()
export class NextFixturesService {

  constructor(
    private ngRedux: NgRedux<AppState>,
    private actions: NextFixturesActions,
    private apiService: ApiService) {}

  public fetchNextFixtures(): void {
    this.apiService.fetchNextFixtures().subscribe((fixtures: Fixture[]) => {
      this.fetchNextFixutresSuccess(fixtures);
    }, error => {
      this.fetchNextFixutresFail(error);
    });
  }

  fetchNextFixutresSuccess(fixtures: Fixture[]): void {
    this.ngRedux.dispatch(this.actions.fetchNextFixturesSuccess(fixtures));
  }

  fetchNextFixutresFail(error: string): void {
    this.ngRedux.dispatch(this.actions.fetchNextFixturesFail(error));
  }
}
