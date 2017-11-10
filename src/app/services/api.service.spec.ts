import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ApiService } from "app/services/api.service";
import { HttpTestingController } from "@angular/common/http/testing";
import { inject } from "@angular/core/testing";
import { environment } from "environments/environment";
import { AuthenticationService } from "app/services/authentication.service";
import { AuthenticationServiceMock } from "app/services/mocks/authentication.service.mock";
import { Fixture, Prediction, PredictionType } from "app/app.state";

describe("ApiService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        {
          provide: AuthenticationService,
          useClass: AuthenticationServiceMock
        }
      ]
    });
  });

  describe("fetchNextFixtures", () => {
    it("should get the next fixtures from backend url configured in environment", function () {
      inject([ApiService, HttpTestingController],
          (apiService: ApiService, httpMock: HttpTestingController) => {
            environment.backend_url = "http://the/backend/url"

            apiService.fetchNextFixtures().subscribe(res => {});

            const req = httpMock.expectOne("http://the/backend/url/next-fixtures");
            expect(req).toBeDefined();
            expect(req.request.method).toEqual("GET");
            req.flush("");
            httpMock.verify();
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
    }
    it("should use current authenticated user id", function () {
      inject([ApiService, HttpTestingController, AuthenticationService],
          (apiService: ApiService, httpMock: HttpTestingController, authenticationService) => {
            spyOn(authenticationService, "getUserId").and.returnValue("the-user-id");
            environment.backend_url = "http://the/backend/url"

            apiService.submitPrediction(prediction).subscribe(res => {});

            const req = httpMock.expectOne("http://the/backend/url/users/the-user-id/predictions");
            expect(req).toBeDefined();
            expect(req.request.method).toEqual("POST");
            req.flush("");
          })();
    });

    it("should return error if no authenticated user id", function (done) {
      inject([ApiService, HttpTestingController, AuthenticationService],
          (apiService: ApiService, httpMock: HttpTestingController, authenticationService) => {
            spyOn(authenticationService, "getUserId").and.returnValue(null);

            apiService.submitPrediction(prediction).subscribe(res => {}, error => {
              expect(error).toEqual("must have user_id");
              done();
            });
          })();
    });

    it("should submit the fixture id and the result", function () {
      inject([ApiService, HttpTestingController, AuthenticationService],
          (apiService: ApiService, httpMock: HttpTestingController, authenticationService) => {
            spyOn(authenticationService, "getUserId").and.returnValue("the-user-id");
            environment.backend_url = "http://the/backend/url"

            apiService.submitPrediction(prediction).subscribe(res => {});

            const req = httpMock.expectOne("http://the/backend/url/users/the-user-id/predictions");
            expect(req).toBeDefined();
            expect(req.request.body).toEqual({
              fixture_id: "an-id",
              result: "1"
            });
            req.flush("");
          })();
    });
  });
});
