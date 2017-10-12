import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { HttpClient } from "@angular/common/http";
import { AppState, Fixture } from "app/app.state";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<AppState>) {}

  public fetchNextFixtures(): Observable<any> {
    return this.http.get(`${environment.backend_url}/next-fixtures`);
  }
}

