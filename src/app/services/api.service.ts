import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";
import { Prediction } from "app/app.state";
import { AuthenticationService } from "app/services/authentication.service";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  public fetchNextFixtures(): Observable<any> {
    return this.http.get(`${environment.backend_url}/next-fixtures`);
  }

  public submitPrediction(prediction: Prediction): Observable<any> {
    const userId = this.authenticationService.getUserId();
    if (!userId || userId === "") {
      return Observable.create(observer => { observer.error("must have user_id") });
    }

    const body = {
      fixture_id: prediction.fixture.id,
      result: prediction.result
    }
    return this.http.post(`${environment.backend_url}/users/${userId}/predictions`, body);
  }
}

