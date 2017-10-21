import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Prediction } from "app/app.state";

@Injectable()
export class ApiServiceMock {

  public fetchNextFixtures(): Observable<any> {
    return Observable.of({});
  }

  public submitPrediction(prediction: Prediction): Observable<any> {
    return Observable.of({});
  }
}

