import { Component } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {
  title = "LayoutComponent";
  username = "";
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.username = user.displayName;
      }
    });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }
}
