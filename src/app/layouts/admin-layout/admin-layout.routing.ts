import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CampaignsComponent } from "../../pages/campaigns/campaigns.component";
import { UserComponent } from "../../pages/user/user.component";
import { HistoryComponent } from 'src/app/pages/history/history.component';
import { ConnectorComponent } from 'src/app/pages/connectors/connector.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "campaign", component: CampaignsComponent },
  { path: "optimizations", component: HistoryComponent },
  { path: "connectors", component: ConnectorComponent },
  { path: "profile", component: UserComponent }
];
