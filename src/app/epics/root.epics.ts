import { Injectable } from "@angular/core";
import { combineEpics, createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { Action } from "redux";
import { NextFixturesEpics } from "app/epics/next-fixtures.epics";

@Injectable()
export class RootEpic {
  constructor(private nextFixturesEpics: NextFixturesEpics) {}

  getRootEpic(): EpicMiddleware<Action, {}, any> {
    return createEpicMiddleware(
      combineEpics(
        ...this.nextFixturesEpics.getEpics()
      )
    )
  }
}
