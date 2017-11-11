import { Injectable } from "@angular/core";
import { IAction } from "app/app.module";
import { Fixture, Prediction, UserPrediction } from "app/app.state";

@Injectable()
export class NextFixturesActions {
  static fetchNextFixtures = "fetch next fixtures";
  static fetchNextFixturesStarted = "fetch next fixtures started";
  static fetchNextFixturesSuccess = "fetch next fixtures success";
  static fetchNextFixturesFail = "fetch next fixtures fail";
  static predictionSelected = "prediction selected";
  static submitPredictionStarted = "submit prediction started";
  static submitPredictionSuccess = "submit prediction success";
  static submitPredictionFail = "submit prediction fail";
  static fetchUserOpenPredictions = "fetch user open predictions";
  static fetchUserOpenPredictionsSuccess = "fetch user open predictions success";

  constructor() {}

  fetchNextFixtures(): IAction {
    return {
      type: NextFixturesActions.fetchNextFixtures
    };
  }

  fetchNextFixturesStarted(): IAction {
    return { type: NextFixturesActions.fetchNextFixturesStarted };
  }


  fetchNextFixturesSuccess(fixtures: Fixture[]): IAction {
    return {
      type: NextFixturesActions.fetchNextFixturesSuccess,
      payload: fixtures
    };
  }

  fetchNextFixturesFail(err: string): IAction {
    return {
      type: NextFixturesActions.fetchNextFixturesFail,
      payload: err
    };
  }

  predictionSelected(prediction: Prediction): IAction {
    return {
      type: NextFixturesActions.predictionSelected,
      payload: prediction
    }
  }

  submitPredictionStarted(prediction: Prediction): IAction {
    return {
      type: NextFixturesActions.submitPredictionStarted,
      payload: prediction
    }
  }

  submitPredictionSuccess(prediction: Prediction): IAction {
    return {
      type: NextFixturesActions.submitPredictionSuccess,
      payload: prediction
    }
  }

  submitPredictionFail(error: string, prediction: Prediction): IAction {
    return {
      type: NextFixturesActions.submitPredictionFail,
      payload: {
        error: error,
        prediction: prediction
      }
    }
  }

  fetchUserOpenPredictions(): IAction {
    return {
      type: NextFixturesActions.fetchUserOpenPredictions
    }
  }

  fetchUserOpenPredictionsSuccess(predictions: UserPrediction[]): IAction {
    return {
      type: NextFixturesActions.fetchUserOpenPredictionsSuccess,
      payload: predictions
    }
  }

}
