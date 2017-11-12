export interface Team {
  name: string;
  logoUrl: string;
}
export interface League {
  name: string;
  started_at: Date;
}
export interface Host {
  name: string;
}
export interface OneXTwoBet {
  type: string;
  result: string;
}
export enum PredictionType {
  OneXTwo = 1
}
export interface Fixture {
  id: string;
  host: Host;
  leauge: string;
  date: Date;
  homeTeam: Team;
  awayTeam: Team;
  prediction_type: PredictionType;
  submitting?: boolean;
  submitted?: boolean;
  my_prediction?: UserPrediction;
}
export interface NextFixturesState {
  raw: Fixture[];
}
export interface UserPrediction {
  fixtureId: string;
  result: any,
  open: boolean
}
export interface Prediction {
  fixture: Fixture;
  result: any;
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
