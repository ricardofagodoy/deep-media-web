import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { Configuration } from 'src/app/models/configuration';

@Component({
  selector: "google-campaign",
  templateUrl: "google.component.html",
  styleUrls: ["google.component.scss"]
})
export class GoogleCampaignComponent implements OnInit, OnChanges {

    private readonly TYPE = 'google'

    @Input()
    public configuration : Configuration

    @Input()
    public options : any

    @Output()
    public saved = new EventEmitter<Configuration>()

    @Output()
    public canceled = new EventEmitter<void>()

    constructor() {}

  ngOnInit() {
  }

  ngOnChanges() {
    // New Configuration
    if (!this.configuration)
      this.configuration = {
        type: this.TYPE,
        adcost_target: 10,
        margin: 5,
        active: false
      } as any
  }

  toggle_active() {
    this.configuration.active = !this.configuration.active
  }

  is_all_valid() {
    return this.configuration.name && 
      this.configuration.adcost_target &&
      this.configuration.ads_campaign &&
      this.configuration.ga_metric
  }
}