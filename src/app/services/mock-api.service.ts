import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";
import { Prediction, Fixture, UserPrediction } from "app/app.state";
import { AuthenticationService } from "app/services/authentication.service";
import { ApiService } from "app/services/api.service";

@Injectable()
export class MockApiService implements ApiService {

  constructor(private http: HttpClient) {}

  fetchNextFixtures(): Observable<Fixture[]> {
    return this.http.get(`${environment.backend_url}/next-fixtures`).
      map((fixtures: Fixture[]) => fixtures);
  }

  fetchUserOpenPredictions(userId: string): Observable<UserPrediction[]> {
    return this.http.get(`${environment.backend_url}/users/${userId}/predictions`).
    map((userPrediction: UserPrediction[]) => userPrediction);
  }

  submitPrediction(userId: string, prediction: Prediction): Observable<any> {
    if (!userId || userId === "") {
      return Observable.create(observer => { observer.error("must have user_id") });
    }

    const body = {
      fixture_id: prediction.fixture.id,
      result: prediction.result
    }
    return this.http.post(`${environment.backend_url}/users/${userId}/predictions`, body);
  }

  createFixture(fixture: Fixture): Observable<any> {
    return Observable.of({});
  }
}

