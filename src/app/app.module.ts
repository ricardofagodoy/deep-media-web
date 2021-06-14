import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';

import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { AuthInterceptor } from './repository/ApiInterceptor';
import { ComponentsModule } from './layouts/admin-layout/components/components.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    SocialLoginModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, GuestLayoutComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.google_connector_client_id,
              {'offline_access': true}
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
