import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Prediction, Fixture, UserPrediction } from "app/app.state";

@Injectable()
export class ApiServiceMock {

  fetchNextFixtures(): Observable<Fixture[]> {
    return Observable.of([]);
  }

  fetchUserOpenPredictions(userId: string): Observable<UserPrediction[]> {
    return Observable.of([]);
  }

  submitPrediction(userId: string, prediction: Prediction): Observable<any> {
    return Observable.of({});
  }
}

