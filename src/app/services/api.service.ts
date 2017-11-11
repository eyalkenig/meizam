import { Observable } from "rxjs/Observable";
import { Prediction, Fixture, UserPrediction } from "app/app.state";

export abstract class ApiService {

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

