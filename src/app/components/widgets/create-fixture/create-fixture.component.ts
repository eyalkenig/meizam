import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Fixture, Team, PredictionType, Prediction, Host } from "app/app.state";

@Component({
  selector: "create-fixture",
  templateUrl: "./create-fixture.component.html",
  styleUrls: ["./create-fixture.component.scss"],
  animations: []
})

export class CreateFixtureComponent {
  @Input() host: Host;
  @Output() fixtureCreated: EventEmitter<Fixture> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  today: Date = new Date();
  homeTeam: string;
  homeTeamLogoUrl: string;
  awayTeam: string;
  awayTeamLogoUrl: string;
  fixtureDate: Date;
  leauge: string;
  fixture: Fixture;

  constructor() {}

  ngOnInit(): void {}

  create() {
    const fixture: Fixture = {
      id: "",
      host: this.host,
      leauge: this.leauge,
      date: this.fixtureDate,
      homeTeam: {
        name: this.homeTeam,
        logoUrl: this.homeTeamLogoUrl
      },
      awayTeam: {
        name: this.awayTeam,
        logoUrl: this.awayTeamLogoUrl
      },
      prediction_type: PredictionType.OneXTwo
    }
    this.fixtureCreated.emit(fixture);
  }

  closeCard() {
    this.close.emit();
  }
}
