import { Injectable } from "@angular/core";
import { Prediction } from "app/app.state";

@Injectable()
export class NextFixturesServiceMock {

  public fetchNextFixtures(): void {}

  public submitPrediction(prediction: Prediction): void {}
}

