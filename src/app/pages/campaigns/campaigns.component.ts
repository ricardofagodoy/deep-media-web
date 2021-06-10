import { Component, OnInit, ViewChild } from "@angular/core";
import { CampaignsFacade } from './campaigns.facade';
import { Configuration } from 'src/app/models/configuration';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: "app-campaigns",
  templateUrl: "campaigns.component.html",
  styleUrls: ["campaigns.component.scss"]
})
export class CampaignsComponent implements OnInit {

  private readonly TYPE = 'google'
  public isCollapsed = false;
  
  @ViewChild('configsAccordion')
  private configsAccordion

  public current_configuration: Configuration

  public configurations: Observable<Configuration[]>
  public connectors: Observable<string[]>
  public connectorOptions: Observable<any>

  constructor(
    private facade: CampaignsFacade,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

    // Bind all data observables
    this.configurations = facade.loadConfiguration()
    this.connectors = this.facade.loadConnectors().pipe(finalize(() => this.spinner.hide()))
  }

  ngOnInit() {
    this.spinner.show()
  }

  create_new() {

    this.spinner.show()

    this.current_configuration = {
      type: this.TYPE,
      adcost_target: 10
    } as any
  }

  edit(configuration) {

    this.current_configuration = configuration

    this.connectorOptions = this.facade.loadConnectorOptions(configuration.type).pipe(finalize(() => this.spinner.hide()))
    this.configsAccordion.toggle(configuration.id)
    this.spinner.show()
  }

  save(configuration) {

    this.facade.saveConfiguration(configuration).subscribe((configuration) => {
      this.toastr.info('Success', 'All saved!', {
        positionClass: 'toast-bottom-center'
      })

      this.cancel(configuration.id)
    }, () => {
      this.toastr.info('Something went wrong - please try again!', 'Oh no!', {
        positionClass: 'toast-bottom-center'
      })
    })
  }

  cancel(id) {
    this.configsAccordion.toggle(id)
  }
}