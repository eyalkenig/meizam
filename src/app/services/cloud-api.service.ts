import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";
import { Prediction, Fixture, UserPrediction } from "app/app.state";
import { AuthenticationService } from "app/services/authentication.service";
import { ApiService } from "app/services/api.service";
import { AngularFirestore } from "angularfire2/firestore";
import { User } from "firebase/app";

@Injectable()
export class CloudApiService implements ApiService {

  constructor(private angularFirestore: AngularFirestore,
    private authenticationService: AuthenticationService) {}

  public fetchNextFixtures(): Observable<Fixture[]> {
    return this.angularFirestore.collection<Fixture>("fixtures").snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Fixture;
        const id = a.payload.doc.id;
        const fixture: Fixture = { ...data, id: id };
        return fixture;
      });
    });
  }

  public fetchUserOpenPredictions(userId: string): Observable<UserPrediction[]> {
    return this.angularFirestore.
      collection<User>("users").
      doc(userId).
      collection("predictions", ref => ref.where("open", "==", true)).
      snapshotChanges().
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as UserPrediction;
          const id = a.payload.doc.id;
          const userPrediction: UserPrediction = { ...data, fixtureId: id };
          return userPrediction;
        });
      });
  }

  submitPrediction(userId: string, prediction: Prediction): Observable<any> {
    return Observable.fromPromise(this.angularFirestore.
      collection<User>("users").
      doc(userId).
      collection<Prediction>("predictions").
      doc(prediction.fixture.id).
      set({result: prediction.result, open: true}));
  }
}

