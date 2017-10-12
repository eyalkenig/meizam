import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState, Fixture } from "app/app.state";
import { environment } from "environments/environment";
import { ApiService } from "app/services/api.service";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";

@Injectable()
export class NextFixturesService {

  constructor(
    private dataService: ApiService,
    private ngRedux: NgRedux<AppState>,
    private actions: NextFixturesActions) {}

  public fetchNextFixtures(): void {
    this.dataService.fetchNextFixtures().subscribe(res => {
      const nextFixtures = res;
      this.fetchNextFixutresSuccess(nextFixtures);
    })
  }

  fetchNextFixutresSuccess(fixtures: Fixture[]): void {
    this.ngRedux.dispatch(this.actions.fetchNextFixturesSuccess(fixtures));
  }

  fetchNextFixutresFail(error: string): void {
    this.ngRedux.dispatch(this.actions.fetchNextFixturesFail(error));
  }
}

