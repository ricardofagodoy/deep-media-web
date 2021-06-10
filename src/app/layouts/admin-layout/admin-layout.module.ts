import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CampaignsComponent } from "../../pages/campaigns/campaigns.component";
import { UserComponent } from "../../pages/user/user.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HistoryComponent } from 'src/app/pages/history/history.component';
import { ConnectorComponent } from 'src/app/pages/connectors/connector.component';
import { GoogleConnectorComponent } from 'src/app/pages/connectors/google/google.connector.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { AccountPipe } from 'src/app/pages/campaigns/views/google/pipes/account.pipe';
import { GoogleCampaignComponent } from 'src/app/pages/campaigns/views/google/google.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    CampaignsComponent, GoogleCampaignComponent,
    HistoryComponent,
    ConnectorComponent, GoogleConnectorComponent, AccountPipe
  ]
})
export class AdminLayoutModule {}
