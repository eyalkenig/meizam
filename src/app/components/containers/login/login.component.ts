import { Component } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  title = "LoginComponent";

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener.bind(this));
  }
  private firebaseAuthChangeListener(response) {
    if (response) {
      this.router.navigate(["/open"]);
    } else {
      console.log("Logged out :(");
    }
  }
}
