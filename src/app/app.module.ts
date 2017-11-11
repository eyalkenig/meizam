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
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { LoginComponent } from "app/components/containers/login/login.component";
import { AuthGuard } from "app/guards/auth-guard";
import { AngularFireAuth } from "angularfire2/auth";
import { LayoutComponent } from "app/components/containers/layout/layout.component";
import { AuthMethods, AuthProvider, FirebaseUIAuthConfig, FirebaseUIModule, AuthProviderWithCustomConfig } from 'firebaseui-angular';
import { environment } from "environments/environment";
import { AngularFirestore, AngularFirestoreModule } from "angularfire2/firestore";
import { PredictionsService } from "app/services/predictions.service";
import { CloudApiService } from "app/services/cloud-api.service";

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    AuthProvider.Password
  ],
  method: AuthMethods.Popup,
  tos: ""
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
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
    NgReduxModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFirestoreModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [
    AngularFireAuth,
    AuthGuard,
    NgReduxRouter,
    {
      provide: ApiService,
      useClass: CloudApiService
    },
    RootEpic,
    AppActions,
    AuthenticationService,
    LocalStorageService,
    PredictionsService,

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
