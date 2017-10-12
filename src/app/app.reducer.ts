import { combineReducers, Reducer } from 'redux';
import { routerReducer } from '@angular-redux/router';

import { AppState, DataState } from './app.state'
import { NextFixturesReducer } from 'app/components/containers/next-fixtures/next-fixtures.reducer';
import { OpenPredictionsReducer } from 'app/components/containers/open-predictions/open-predictions.reducer';


const dataReducer: Reducer<DataState> = combineReducers<DataState>({
  nextFixtures: NextFixturesReducer,
  openPredictions: OpenPredictionsReducer
});

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  data: dataReducer,
  router: routerReducer
});
