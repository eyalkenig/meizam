import { Injectable } from "@angular/core";
import { IAction } from "app/app.module";
import { OpenPredictionsState } from "app/app.state";

@Injectable()
export class OpenPredictionsActions {
  static fetchOpenPredictions = "fetch open predictions";
  static fetchOpenPredictionsStarted = "fetch open predictions started";
  static fetchOpenPredictionsSuccess = "fetch open predictions success";
  static fetchOpenPredictionsFail = "fetch open predictions fail";

  constructor() {}

  fetchOpenPredictions(): IAction {
    return {
      type: OpenPredictionsActions.fetchOpenPredictions
    };
  }

  fetchOpenPredictionsStarted(): IAction {
    return { type: OpenPredictionsActions.fetchOpenPredictionsStarted };
  }


  fetchOpenPredictionsSuccess(predictions: OpenPredictionsState[]): IAction {
    return {
      type: OpenPredictionsActions.fetchOpenPredictionsSuccess,
      payload: predictions
    };
  }

  fetchOpenPredictionsFail(err: string): IAction {
    return {
      type: OpenPredictionsActions.fetchOpenPredictionsFail,
      payload: err
    };
  }
}
