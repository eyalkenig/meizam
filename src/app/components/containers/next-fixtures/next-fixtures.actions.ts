import { Injectable } from "@angular/core";
import { IAction } from "app/app.module";
import { Fixture } from "app/app.state";

@Injectable()
export class NextFixturesActions {
  static fetchNextFixtures = "fetch next fixtures";
  static fetchNextFixturesStarted = "fetch next fixtures started";
  static fetchNextFixturesSuccess = "fetch next fixtures success";
  static fetchNextFixturesFail = "fetch next fixtures fail";

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
}
