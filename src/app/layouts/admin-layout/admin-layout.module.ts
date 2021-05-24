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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    CampaignsComponent,
    HistoryComponent,
    ConnectorComponent, GoogleConnectorComponent
  ]
})
export class AdminLayoutModule {}
