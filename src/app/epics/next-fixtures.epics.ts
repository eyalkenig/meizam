import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/withLatestFrom";
import { NextFixturesService } from "app/services/next-fixtures.service";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";

@Injectable()
export class NextFixturesEpics {
    constructor(private nextFixturesService: NextFixturesService, private actions: NextFixturesActions) {}

    fetchNextFixtures = action$ => action$.ofType(NextFixturesActions.fetchNextFixtures)
      .map(action => {
          this.nextFixturesService.fetchNextFixtures();
          return this.actions.fetchNextFixturesStarted();
        });
}
