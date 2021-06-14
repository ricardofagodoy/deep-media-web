import { Component, OnInit, ViewChild } from "@angular/core";
import { CampaignsFacade } from './campaigns.facade';
import { Configuration } from 'src/app/models/configuration';
import { ToastrService } from 'ngx-toastr';
import { Observable, EMPTY } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, catchError } from 'rxjs/operators';

@Component({
  selector: "app-campaigns",
  templateUrl: "campaigns.component.html",
  styleUrls: ["campaigns.component.scss"]
})
export class CampaignsComponent implements OnInit {

  public readonly AVAILABLE_CONNECTORS = {
    'google': 'Google Ads'
  }

  @ViewChild('configsAccordion')
  private configsAccordion

  public configurations: Configuration[]
  public connectors: Observable<string[]>
  public connectorOptions: Observable<any>

  constructor(
    private facade: CampaignsFacade,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show()

    // Load data
    this.facade.loadConfiguration().subscribe(configurations => {
      this.configurations = this.sort_configurations(configurations)
    })

    // Bind
    this.connectors = this.facade.loadConnectors()
      .pipe(
        finalize(() => this.spinner.hide()),
        catchError(() => {

          this.toastr.error('Something went wrong, please try again.', 'Oh no!', {
            positionClass: 'toast-bottom-center'
          })

          return EMPTY
        })
      )
  }

  create_new(type) {
    this.edit({
      type: type
    })
  }

  edit(configuration) {
    this.spinner.show()
    this.connectorOptions = this.facade.loadConnectorOptions(configuration.type).pipe(finalize(() => this.spinner.hide()))
    this.configsAccordion.collapseAll()
    this.configsAccordion.expand('panel-' + (configuration.id || 'new'))
  }

  delete(id) {

    this.spinner.show()

    this.facade.deleteConfiguration(id).pipe(finalize(() => this.spinner.hide()))
    .subscribe(() => {
      this.toastr.success('Success', 'Configuration deleted.', {
        positionClass: 'toast-bottom-center'
      })

      // Update list
      this.configurations = this.sort_configurations(this.configurations.filter(c => c.id != id))

    }, () => {
      this.toastr.error('Something went wrong, please try again.', 'Oh no!', {
        positionClass: 'toast-top-center'
      })
    })
  }

  save(configuration) {

    this.spinner.show()

    this.facade.saveConfiguration(configuration).pipe(finalize(() => this.spinner.hide()))
    .subscribe((saved_configuration) => {
      this.toastr.success('Success', 'All saved.', {
        positionClass: 'toast-bottom-center'
      })

      // Update list
      this.configurations = this.sort_configurations([
        ...this.configurations.filter(c => c.id != saved_configuration.id),
        saved_configuration
      ])

      // Close
      this.configsAccordion.collapseAll()
      
    }, () => {
      this.toastr.error('Something went wrong, please try again.', 'Oh no!', {
        positionClass: 'toast-top-center'
      })
    })
  }

  private sort_configurations(configurations : Configuration[]) {
    return configurations.sort((a, b) => {
      if (a.name < b.name) return -1
      return a.name > b.name ? 1 : 0
    })
  }

  cancel(id) {
    this.configsAccordion.collapse('panel-' + id)
  }
}