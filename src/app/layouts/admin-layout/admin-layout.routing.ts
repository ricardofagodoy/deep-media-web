import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CampaignsComponent } from "../../pages/campaigns/campaigns.component";
import { ConfigurationComponent } from "../../pages/configuration/configuration.component";
import { UserComponent } from "../../pages/user/user.component";
import { HistoryComponent } from 'src/app/pages/history/history.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "campaign", component: CampaignsComponent },
  { path: "history", component: HistoryComponent },
  { path: "configuration", component: ConfigurationComponent },
  { path: "profile", component: UserComponent }
];
