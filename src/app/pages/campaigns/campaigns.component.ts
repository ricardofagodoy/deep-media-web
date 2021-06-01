import { Component, OnInit } from "@angular/core";
import { CampaignsFacade } from './campaigns.facade';
import { Configuration } from 'src/app/models/configuration';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-campaigns",
  templateUrl: "campaigns.component.html",
  styleUrls: ["campaigns.component.scss"]
})
export class CampaignsComponent implements OnInit {

  private readonly TYPE = 'google'

  public configuration : Configuration
  public connectors : Observable<string[]>
  public connectorOptions : any

  constructor(
    private facade : CampaignsFacade, 
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

    facade.configuration$.subscribe(configuration => {
      this.configuration = configuration[0]
    })

    this.connectors = this.facade.loadConnectors()
    this.connectorOptions = this.facade.loadConnectorOptions(this.TYPE)
  }

  ngOnInit() {
    this.spinner.show()
  }

  create_new() {
    this.configuration = {
      type: this.TYPE,
      adcost_target: 10
    } as any
  }

  toggle_active() {
    this.configuration.active = !this.configuration.active
  }

  is_all_valid() {
    return this.configuration.adcost_target &&
           this.configuration.ads_campaign &&
           this.configuration.ga_metric
  }

  save() {
    this.facade.saveConfiguration(this.configuration).subscribe((configuration) => {

      this.configuration = configuration

      this.toastr.info('Success', 'All saved!', {
        positionClass: 'toast-bottom-center'
      })
    })
  }

  cancel() {
    this.configuration = undefined
  }
}