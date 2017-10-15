import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NextFixtureComponent } from "app/components/widgets/next-fixture/next-fixture.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Fixture } from "app/app.state";

describe("NextFixtureComponent", () => {
  let component: NextFixtureComponent;
  let fixture: ComponentFixture<NextFixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextFixtureComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextFixtureComponent);
    component = fixture.componentInstance;
  });
  const baseFixture: Fixture = {
    id: "1",
    homeTeam: {
      name: "Maccabi Haifa",
      logoUrl: "http://images.one.co.il/images/teams/logos_111x111/4.gif"
    },
    awayTeam: {
      name: "Maccabi Tel-Aviv",
      logoUrl: "http://images.one.co.il/images/teams/logos_111x111/3.gif"
    },
    leauge: { name: "Israeli Winner League", started_at: new Date("03-30-2017 21:00") },
    time: new Date("10-17-2017 20:00"),
    host: {
      name: "@eyalkenig"
    },
    prediction_type: 1,
    submitted: false
  }
  it("should be created", () => {
    component.fixture = baseFixture;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
