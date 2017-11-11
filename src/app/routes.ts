import { AuthGuard } from "app/guards/auth-guard";
import { LayoutComponent } from "app/components/containers/layout/layout.component";
import { LoginComponent } from "app/components/containers/login/login.component";
import { NextFixturesComponent } from "app/components/containers/next-fixtures/next-fixtures.component";

export const routes = [
    {
        path: "",
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: "open",
              component: NextFixturesComponent,
              canActivate: [AuthGuard],
            }
        ]
    },
    { path: "", redirectTo: "/open", pathMatch: "full", canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent},
];
