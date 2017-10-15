import { Component, Input } from "@angular/core";
import { Team } from "app/app.state";

@Component({
  selector: "fixture-team",
  templateUrl: "./fixture-team.component.html",
  styleUrls: ["./fixture-team.component.scss"],
  animations: []
})
export class FixtureTeamComponent {
  @Input() team: Team;

  constructor() { }

  ngOnInit(): void {}
}
