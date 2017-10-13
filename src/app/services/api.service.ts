import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  public fetchNextFixtures(): Observable<any> {
    return this.http.get(`${environment.backend_url}/next-fixtures`);
  }
}

