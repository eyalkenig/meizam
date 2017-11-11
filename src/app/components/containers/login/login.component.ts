import { Component } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  title = "LoginComponent";

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthenticationService) {
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener.bind(this));
  }
  private firebaseAuthChangeListener(response: firebase.User | null) {
    if (response) {
      this.authService.setUser(response.uid);
      this.router.navigate(["/open"]);
    } else {
      console.log("Logged out :(");
    }
  }
}
