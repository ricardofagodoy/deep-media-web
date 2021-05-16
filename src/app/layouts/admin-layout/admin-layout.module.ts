import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CampaignsComponent } from "../../pages/campaigns/campaigns.component";
import { ConfigurationComponent } from "../../pages/configuration/configuration.component";
import { UserComponent } from "../../pages/user/user.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GoogleAdsConfigurationComponent } from 'src/app/pages/configuration/google_ads/google_ads.configuration.component';
import { GoogleAnalyticsConfigurationComponent } from 'src/app/pages/configuration/google_analytics/google_analytics.configuration.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    CampaignsComponent,
    ConfigurationComponent, GoogleAdsConfigurationComponent, GoogleAnalyticsConfigurationComponent
  ]
})
export class AdminLayoutModule {}
