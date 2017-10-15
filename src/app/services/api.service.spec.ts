import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ApiService } from "app/services/api.service";
import { HttpTestingController } from "@angular/common/http/testing";
import { inject } from "@angular/core/testing";
import { environment } from "environments/environment";
import { AuthenticationService } from "app/services/authentication.service";
import { AuthenticationServiceMock } from "app/services/mocks/authentication.service.mock";

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
});
