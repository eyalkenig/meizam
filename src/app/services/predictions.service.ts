import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState, Fixture, Prediction, UserPrediction } from "app/app.state";
import { environment } from "environments/environment";
import { ApiService } from "app/services/api.service";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthenticationService } from "app/services/authentication.service";
import { User } from "firebase/app";

@Injectable()
export class PredictionsService {

  constructor(
    private ngRedux: NgRedux<AppState>,
    private actions: NextFixturesActions,
    private apiService: ApiService,
    private authenticationService: AuthenticationService) {}

  public fetchUserOpenPredictions(): void {
    const uid = this.authenticationService.getUserId();
    this.apiService.fetchUserOpenPredictions(uid).subscribe((predictions: UserPrediction[]) => {
      this.fetchUserOpenPredictionsSuccess(predictions);
    });
  }

  public submitPrediction(prediction: Prediction): void {
    const uid = this.authenticationService.getUserId();
    this.apiService.submitPrediction(uid, prediction).subscribe(res => {
        this.submitPredictionSuccess(prediction);
      }, error => {
        this.submitPredictionFail(error, prediction);
      });
  }

  fetchUserOpenPredictionsSuccess(predictions: UserPrediction[]): void {
    this.ngRedux.dispatch(this.actions.fetchUserOpenPredictionsSuccess(predictions));
  }

  submitPredictionSuccess(prediction: Prediction): void {
    this.ngRedux.dispatch(this.actions.submitPredictionSuccess(prediction));
  }

  submitPredictionFail(error: string, prediction: Prediction): void {
    this.ngRedux.dispatch(this.actions.submitPredictionFail(error, prediction));
  }
}

