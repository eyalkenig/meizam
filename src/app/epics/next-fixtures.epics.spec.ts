import { TestBed } from "@angular/core/testing";
import { NextFixturesService } from "app/services/next-fixtures.service";
import { NextFixturesServiceMock } from "app/services/mocks/next-fixtures.service.mock";
import { NextFixturesEpics } from "app/epics/next-fixtures.epics";
import { inject } from "@angular/core/testing";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";
import { ActionsObservable } from "redux-observable";
import * as assert from "assert";
import { AppActions } from "app/app.acions";

describe("NextFixturesEpics", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NextFixturesEpics,
        NextFixturesActions,
        AppActions,
        {
          provide: NextFixturesService,
          useClass: NextFixturesServiceMock
        }
      ]
    });
  });

  describe("fetchNextFixtures", () => {
    it("should fetch next fixtures from service", function (done) {
      inject([NextFixturesEpics, NextFixturesService, NextFixturesActions],
          (nextFixturesEpics: NextFixturesEpics, nextFixturesService: NextFixturesService, nextFixturesActions: NextFixturesActions) => {
              const filters = {};
              const action$ = ActionsObservable.of(nextFixturesActions.fetchNextFixtures());

              spyOn(nextFixturesService, "fetchNextFixtures");
              nextFixturesEpics.fetchNextFixtures(action$)
                  .subscribe(actualOutputAction => {
                      expect(nextFixturesService.fetchNextFixtures).toHaveBeenCalled();
                      done();
                  });
          })();
    });
    it("should return fetch next fixtures started", function (done) {
      inject([NextFixturesEpics, NextFixturesService, NextFixturesActions],
          (nextFixturesEpics: NextFixturesEpics, nextFixturesService: NextFixturesService, nextFixturesActions: NextFixturesActions) => {
              const filters = {};
              const action$ = ActionsObservable.of(nextFixturesActions.fetchNextFixtures());

              nextFixturesEpics.fetchNextFixtures(action$)
                  .subscribe(actualOutputAction => {
                      assert.deepEqual(actualOutputAction, nextFixturesActions.fetchNextFixturesStarted());
                      done();
                  });
          })();
    });

  });
});
