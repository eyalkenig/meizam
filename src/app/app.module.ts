import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgReduxModule, NgRedux, DevToolsExtension } from "@angular-redux/store";
import { NgReduxRouterModule, NgReduxRouter, routerReducer } from "@angular-redux/router";
import { RouterModule } from "@angular/router";
import { Action } from "redux";
import { routes } from "./routes";
import { ApiService } from "./services/api.service";
import { AppComponent } from "./app.component";
import { composeReducers, defaultFormReducer } from "@angular-redux/form";
import { rootReducer } from "./app.reducer"
import { AppState, INITIAL_STATE } from "./app.state"
import { NextFixturesService } from "app/services/next-fixtures.service";
import { NextFixturesComponent } from "app/components/containers/next-fixtures/next-fixtures.component";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";
import { RootEpic } from "app/epics/root.epics";
import { NextFixturesEpics } from "app/epics/next-fixtures.epics";
import { NextFixtureComponent } from "app/components/widgets/next-fixture/next-fixture.component";
import { FixtureTeamComponent } from "app/components/widgets/fixture-team/fixture-team.component";
import { AuthenticationService } from "app/services/authentication.service";
import { LocalStorageService } from "app/services/local-storage.service";
import { AppActions } from "app/app.acions";

@NgModule({
  declarations: [
    AppComponent,
    NextFixturesComponent,
    NextFixtureComponent,
    FixtureTeamComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgReduxModule
  ],
  providers: [
    NgReduxRouter,
    ApiService,
    RootEpic,
    AppActions,
    AuthenticationService,
    LocalStorageService,

    /* NextFixtures */
    NextFixturesService,
    NextFixturesActions,
    NextFixturesEpics
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<AppState>, private devTools: DevToolsExtension, ngReduxRouter: NgReduxRouter, private rootEpic: RootEpic) {
    const storeEnhancers = this.devTools.isEnabled() ? [ this.devTools.enhancer() ] : [];
    const epics = [rootEpic.getRootEpic()];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, epics, storeEnhancers);
    ngReduxRouter.initialize();
  }
}

export interface IAction extends Action {
  type: string;
  payload?: any;
}
