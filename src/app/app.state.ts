export interface Team {
  name: string;
  logoUrl: string;
}
export interface League {
  name: string;
  started_at: Date;
}
export interface Fixture {
  leauge: League,
  time: Date,
  homeTeam: Team,
  awayTeam: Team
}
export interface NextFixturesState {
  raw: Fixture[];
}
export interface Prediction {
  fixture: Fixture;
  homeTeamScore: number;
  awayTeamScore: number;
}
export interface OpenPredictionsState {
  raw: Prediction[];
}
export interface DataState {
  nextFixtures: NextFixturesState;
  openPredictions: OpenPredictionsState;
}
export const INITIAL_STATE_NEXT_FIXTURES: NextFixturesState = {
  raw: []
}
export const INITIAL_STATE_OPEN_PREDICTIONS: OpenPredictionsState = {
  raw: []
}
export const INITIAL_STATE_DATA: DataState = {
  nextFixtures: INITIAL_STATE_NEXT_FIXTURES,
  openPredictions: INITIAL_STATE_OPEN_PREDICTIONS
}

export interface AppState {
  data: DataState;
  router?: any;
}
export const INITIAL_STATE: AppState = {
  data: INITIAL_STATE_DATA
};
