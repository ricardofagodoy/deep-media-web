import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: "",
        loadChildren:
          () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: "",
    component: GuestLayoutComponent,
    ...canActivate(redirectLoggedInToDashboard),
    children: [
      {
        path: "",
        loadChildren:
          () => import('./layouts/guest-layout/guest-layout.module').then(m => m.GuestLayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
