import { Component, OnInit } from "@angular/core";
import { CampaignsFacade } from './campaigns.facade';
import { Configuration } from 'src/app/models/configuration';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-campaigns",
  templateUrl: "campaigns.component.html",
  styleUrls: ["campaigns.component.scss"]
})
export class CampaignsComponent implements OnInit {

  public configuration : Configuration
  public connectorOptions : any

  constructor(
    private facade : CampaignsFacade, 
    private toastr: ToastrService) {

    facade.configuration$.subscribe(configuration => {
      this.configuration = configuration[0]
    })

    this.connectorOptions = this.facade.loadConnectorOptions()
  }

  ngOnInit() {}

  create_new() {
    this.configuration = {} as any
  }

  toggle_active() {
    this.configuration.active = !this.configuration.active
  }

  save() {
    this.facade.saveConfiguration(this.configuration).subscribe(() => {
      this.toastr.info('Success', 'All saved!', {
        positionClass: 'toast-bottom-center'
      })
    })
  }
}