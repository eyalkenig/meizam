import { Injectable } from "@angular/core";
import { IAction } from "app/app.module";
import { Fixture, Prediction } from "app/app.state";

@Injectable()
export class AppActions {
  static doNothing = "just do nothing";

  constructor() {}

  doNothing(): IAction {
    return {
      type: AppActions.doNothing
    };
  }
}
