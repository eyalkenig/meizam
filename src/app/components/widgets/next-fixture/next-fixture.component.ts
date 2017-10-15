import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Fixture, Team, PredictionType, Prediction } from "app/app.state";
import { trigger, transition, animate, style, query, animateChild, state } from "@angular/animations";


@Component({
  selector: "next-fixture",
  templateUrl: "./next-fixture.component.html",
  styleUrls: ["./next-fixture.component.scss"],
  animations: []
})
export class NextFixtureComponent {
  @Input() fixture: Fixture;
  @Output() resultSelected: EventEmitter<any> = new EventEmitter();
  alreadySelected = false;

  constructor() {}

  ngOnInit(): void {}

  select(result: string) {
    this.alreadySelected = true;
    const prediction: Prediction = {
      fixture: this.fixture,
      prediction_type: PredictionType.OneXTwo,
      result: result
    }
    this.resultSelected.emit(prediction);
  }
}
