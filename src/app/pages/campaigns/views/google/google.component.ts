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
      this.configuration.ga_profile &&
      this.configuration.ga_dimension &&
      this.configuration.ga_metric
  }

  // Binding to view selections
  select_ads_account(ads_account) {
    this.configuration.ads_account = ads_account
    this.configuration.ads_campaign = undefined
  }

  select_ads_campaign(ads_campaign) {
    this.configuration.ads_campaign = ads_campaign
  }

  select_analytics_account(analytics_account) {
    this.configuration.ga_account = analytics_account
    this.configuration.ga_property = undefined
    this.configuration.ga_profile = undefined
    this.configuration.ga_metric = undefined
  }

  select_analytics_property(analytics_property) {
    this.configuration.ga_property = analytics_property
    this.configuration.ga_profile = undefined
    this.configuration.ga_metric = undefined
  }

  select_analytics_profile(analytics_profile) {
    this.configuration.ga_profile = analytics_profile
  }

  select_analytics_dimension(analytics_dimension) {
    this.configuration.ga_dimension = analytics_dimension
  }

  select_analytics_metric(analytics_metric) {
    this.configuration.ga_metric = analytics_metric
  }
}