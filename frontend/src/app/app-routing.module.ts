import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./services/auth-guard.service";

import { HomeComponent } from "./components/home/home.component";
import { PostsComponent } from "./components/posts/posts.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { GererVisiteurComponent } from "./components/gerer-visiteur/gerer-visiteur.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard]  },
  { path: "Visitis", component: GererVisiteurComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "notfound", component: NotfoundComponent},
  { path: "**", redirectTo: "/notfound" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
