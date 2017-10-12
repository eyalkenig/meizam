import { IAction } from "app/app.module";
import { OpenPredictionsState, INITIAL_STATE_OPEN_PREDICTIONS } from "app/app.state";
import { OpenPredictionsActions } from "app/components/containers/open-predictions/open-predictions.actions";

export function OpenPredictionsReducer(lastState: OpenPredictionsState, action: IAction): OpenPredictionsState {
  if (lastState === undefined) { return INITIAL_STATE_OPEN_PREDICTIONS; }
  switch (action.type) {
    case OpenPredictionsActions.fetchOpenPredictions:
      break;
    case OpenPredictionsActions.fetchOpenPredictionsStarted:
      break;
    case OpenPredictionsActions.fetchOpenPredictionsSuccess:
      return { raw: action.payload }
    case OpenPredictionsActions.fetchOpenPredictionsFail:
      alert("Failed to fetch open predictions.");
      break;
  }
  return lastState;
}
