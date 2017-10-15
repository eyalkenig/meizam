import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState, Fixture, Prediction } from "app/app.state";
import { environment } from "environments/environment";
import { ApiService } from "app/services/api.service";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";

@Injectable()
export class NextFixturesService {

  constructor(
    private apiService: ApiService,
    private ngRedux: NgRedux<AppState>,
    private actions: NextFixturesActions) {}

  public fetchNextFixtures(): void {
    this.apiService.fetchNextFixtures().subscribe(res => {
      const nextFixtures = res;
      this.fetchNextFixutresSuccess(nextFixtures);
    }, error => {
      this.fetchNextFixutresFail(error);
    });
  }

  public submitPrediction(prediction: Prediction): void {
    this.apiService.submitPrediction(prediction).subscribe(res => {
      this.submitPredictionSuccess(prediction);
    }, error => {
      this.submitPredictionFail(error, prediction);
    });
  }

  fetchNextFixutresSuccess(fixtures: Fixture[]): void {
    this.ngRedux.dispatch(this.actions.fetchNextFixturesSuccess(fixtures));
  }

  fetchNextFixutresFail(error: string): void {
    this.ngRedux.dispatch(this.actions.fetchNextFixturesFail(error));
  }

  submitPredictionSuccess(prediction: Prediction): void {
    this.ngRedux.dispatch(this.actions.submitPredictionSuccess(prediction));
  }

  submitPredictionFail(error: string, prediction: Prediction): void {
    this.ngRedux.dispatch(this.actions.submitPredictionFail(error, prediction));
  }
}

