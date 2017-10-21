import { TestBed } from "@angular/core/testing";
import { ApiService } from "app/services/api.service";
import { ApiServiceMock } from "app/services/mocks/api.service.mock";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";
import { NgReduxTestingModule, MockNgRedux } from "@angular-redux/store/testing";
import { NextFixturesService } from "app/services/next-fixtures.service";
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Fixture, AppState, PredictionType, Prediction } from "app/app.state";
import { NgRedux } from "@angular-redux/store";
import { AppActions } from "app/app.acions";
import { AuthenticationService } from "app/services/authentication.service";
import { AuthenticationServiceMock } from "app/services/mocks/authentication.service.mock";

describe("NextFixturesService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NextFixturesService,
        NgReduxTestingModule,
        NextFixturesActions,
        AppActions,
        {
          provide: NgRedux,
          useClass: MockNgRedux
        },
        {
          provide: ApiService,
          useClass: ApiServiceMock
        }
      ]
    });
  });

  describe("fetchNextFixtures", () => {
    it("should fetch next fixtures from api service", function () {
      inject([NextFixturesService, ApiService],
          (nextFixturesService: NextFixturesService, apiService: ApiService) => {
            spyOn(apiService, "fetchNextFixtures").and.returnValue(Observable.of({}));

            nextFixturesService.fetchNextFixtures();

            expect(apiService.fetchNextFixtures).toHaveBeenCalled();
          })();
    });
    it("should dispatch fetch next fixtures success on success", function () {
      inject([NextFixturesService, ApiService, NextFixturesActions, NgRedux],
        (nextFixturesService: NextFixturesService, apiService: ApiService, nextFixturesActions: NextFixturesActions,
          mockNgRedux: MockNgRedux) => {
          const expectedResult: Fixture[] = [{
            id: "an-id",
            leauge: { name: "a league", started_at: new Date() },
            time: new Date(),
            homeTeam: { name: "a team", logoUrl: "logo1" },
            awayTeam: { name: "b team", logoUrl: "logo2" },
            host: { name: "a name" },
            prediction_type: PredictionType.OneXTwo
          }];
          const expectedAction = nextFixturesActions.fetchNextFixturesSuccess(expectedResult);
          spyOn(apiService, "fetchNextFixtures").and.returnValue(Observable.of(expectedResult));
          const actualDispatch = spyOn(mockNgRedux, "dispatch");

          nextFixturesService.fetchNextFixtures();

          expect(actualDispatch.calls.mostRecent().args[0]).toEqual(expectedAction);
      })();
    });
    it("should dispatch fetch next fixtures fail on failure", function () {
      inject([NextFixturesService, ApiService, NextFixturesActions, NgRedux],
        (nextFixturesService: NextFixturesService, apiService: ApiService, nextFixturesActions: NextFixturesActions,
          mockNgRedux: MockNgRedux) => {
          const expectedError = "the error";
          const expectedAction = nextFixturesActions.fetchNextFixturesFail(expectedError);
          spyOn(apiService, "fetchNextFixtures").and.returnValue(Observable.create(observer => { observer.error(expectedError) }));
          const actualDispatch = spyOn(mockNgRedux, "dispatch");

          nextFixturesService.fetchNextFixtures();

          expect(actualDispatch.calls.mostRecent().args[0]).toEqual(expectedAction);
      })();
    });
  });

  describe("submitPrediction", () => {
    const fixture: Fixture = {
      id: "an-id",
      leauge: { name: "a league", started_at: new Date() },
      time: new Date(),
      homeTeam: { name: "a team", logoUrl: "logo1" },
      awayTeam: { name: "b team", logoUrl: "logo2" },
      host: { name: "a name" },
      prediction_type: PredictionType.OneXTwo
    };
    const prediction: Prediction = {
      fixture: fixture,
      result: "1"
    };
    it("should submit prediction to api service", function () {
      inject([NextFixturesService, ApiService],
          (nextFixturesService: NextFixturesService, apiService: ApiService) => {
            spyOn(apiService, "submitPrediction").and.returnValue(Observable.of({}));

            nextFixturesService.submitPrediction(prediction);

            expect(apiService.submitPrediction).toHaveBeenCalledWith(prediction);
          })();
    });
    it("should dispatch submited predicrtion success on success", function () {
      inject([NextFixturesService, ApiService, NextFixturesActions, NgRedux],
        (nextFixturesService: NextFixturesService, apiService: ApiService, nextFixturesActions: NextFixturesActions,
          mockNgRedux: MockNgRedux) => {
          const expectedAction = nextFixturesActions.submitPredictionSuccess(prediction);
          spyOn(apiService, "submitPrediction").and.returnValue(Observable.of(expectedAction));
          const actualDispatch = spyOn(mockNgRedux, "dispatch");

          nextFixturesService.submitPrediction(prediction);

          expect(actualDispatch.calls.mostRecent().args[0]).toEqual(expectedAction);
      })();
    });
    it("should dispatch submit prediction failed on failure", function () {
      inject([NextFixturesService, ApiService, NextFixturesActions, NgRedux],
        (nextFixturesService: NextFixturesService, apiService: ApiService, nextFixturesActions: NextFixturesActions,
          mockNgRedux: MockNgRedux) => {
          const expectedError = "the error";
          const expectedAction = nextFixturesActions.submitPredictionFail(expectedError, prediction);
          spyOn(apiService, "submitPrediction").and.returnValue(Observable.create(observer => { observer.error(expectedError) }));
          const actualDispatch = spyOn(mockNgRedux, "dispatch");

          nextFixturesService.submitPrediction(prediction);

          expect(actualDispatch.calls.mostRecent().args[0]).toEqual(expectedAction);
      })();
    });
  });
});
