import { Injectable } from "@angular/core";
import { Prediction } from "app/app.state";

@Injectable()
export class PredictionsServiceMock {

  public fetchUserOpenPredictions(): void {}

  public submitPrediction(prediction: Prediction): void {}
}

