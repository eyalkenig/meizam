import { NextFixturesState, INITIAL_STATE_NEXT_FIXTURES } from "../../../app.state";
import { IAction } from "app/app.module";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";

export function NextFixturesReducer(lastState: NextFixturesState, action: IAction): NextFixturesState {
  if (lastState === undefined) { return INITIAL_STATE_NEXT_FIXTURES; }
  switch (action.type) {
    case NextFixturesActions.fetchNextFixtures:
      break;
    case NextFixturesActions.fetchNextFixturesStarted:
      break;
    case NextFixturesActions.fetchNextFixturesSuccess:
      return { raw: action.payload }
    case NextFixturesActions.fetchNextFixturesFail:
      alert("Failed to fetch fixtures.");
      break;
  }
  return lastState;
}
