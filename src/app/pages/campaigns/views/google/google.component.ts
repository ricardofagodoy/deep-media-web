import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Configuration } from 'src/app/models/configuration';

@Component({
  selector: "google-campaign",
  templateUrl: "google.component.html",
  styleUrls: ["google.component.scss"]
})
export class GoogleCampaignComponent implements OnInit {

    @Input()
    public configuration : Configuration

    @Input()
    public options : any

    @Output()
    public saved = new EventEmitter<Configuration>()

    @Output()
    public canceled = new EventEmitter<void>()

    constructor() {}

  ngOnInit() {}

  toggle_active() {
    this.configuration.active = !this.configuration.active
  }

  is_all_valid() {
    return this.configuration.adcost_target &&
      this.configuration.ads_campaign &&
      this.configuration.ga_metric
  }
}