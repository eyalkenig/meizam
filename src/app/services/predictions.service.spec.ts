import { TestBed } from "@angular/core/testing";
import { ApiService } from "app/services/api.service";
import { ApiServiceMock } from "app/services/mocks/api.service.mock";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";
import { NgReduxTestingModule, MockNgRedux } from "@angular-redux/store/testing";
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Fixture, AppState, PredictionType, Prediction } from "app/app.state";
import { NgRedux } from "@angular-redux/store";
import { AppActions } from "app/app.acions";
import { AuthenticationService } from "app/services/authentication.service";
import { AuthenticationServiceMock } from "app/services/mocks/authentication.service.mock";
import { PredictionsService } from "app/services/predictions.service";

describe("PredictionsService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PredictionsService,
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
        },
        {
          provide: AuthenticationService,
          useClass: AuthenticationServiceMock
        }
      ]
    });
  });

  describe("submitPrediction", () => {
    const fixture: Fixture = {
      id: "an-id",
      leauge: "a league",
      date: new Date(),
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
      inject([PredictionsService, ApiService, AuthenticationService],
          (predictionsService: PredictionsService, apiService: ApiService, authenticationService: AuthenticationService) => {
            spyOn(apiService, "submitPrediction").and.returnValue(Observable.of({}));
            spyOn(authenticationService, "getUserId").and.returnValue("the-user-id");

            predictionsService.submitPrediction(prediction);

            expect(apiService.submitPrediction).toHaveBeenCalledWith("the-user-id", prediction);
          })();
    });
    it("should dispatch submited predicrtion success on success", function () {
      inject([PredictionsService, ApiService, NextFixturesActions, NgRedux],
        (predictionsService: PredictionsService, apiService: ApiService, nextFixturesActions: NextFixturesActions,
          mockNgRedux: MockNgRedux) => {
          const expectedAction = nextFixturesActions.submitPredictionSuccess(prediction);
          spyOn(apiService, "submitPrediction").and.returnValue(Observable.of(expectedAction));
          const actualDispatch = spyOn(mockNgRedux, "dispatch");

          predictionsService.submitPrediction(prediction);

          expect(actualDispatch.calls.mostRecent().args[0]).toEqual(expectedAction);
      })();
    });
    it("should dispatch submit prediction failed on failure", function () {
      inject([PredictionsService, ApiService, NextFixturesActions, NgRedux],
        (predictionsService: PredictionsService, apiService: ApiService, nextFixturesActions: NextFixturesActions,
          mockNgRedux: MockNgRedux) => {
          const expectedError = "the error";
          const expectedAction = nextFixturesActions.submitPredictionFail(expectedError, prediction);
          spyOn(apiService, "submitPrediction").and.returnValue(Observable.create(observer => { observer.error(expectedError) }));
          const actualDispatch = spyOn(mockNgRedux, "dispatch");

          predictionsService.submitPrediction(prediction);

          expect(actualDispatch.calls.mostRecent().args[0]).toEqual(expectedAction);
      })();
    });
  });
});
