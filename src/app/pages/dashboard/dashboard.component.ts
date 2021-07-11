import { Component, OnInit } from "@angular/core";
import { DashboardFacade } from './dashboard.facade';
import { Tick } from 'src/app/models/tick';
import { Chart } from 'chart.js';
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, finalize } from "rxjs/operators";
import { EMPTY, Observable } from "rxjs";
import { Configuration } from "src/app/models/configuration";

const LOCALE = 'pt'

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.styles.scss"]
})
export class DashboardComponent implements OnInit {

  configurations : Observable<Configuration[]>

  // Yesterday/Today chart
  public datasets: any;
  public chart_index : number
  public recentChart

  // Custom chart
  private configuration_id_custom : string
  private dates : any
  public customChart

  constructor(private facade: DashboardFacade, 
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

    this.spinner.show()

    this.configurations = this.facade.loadConfiguration()
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

  loadRecentTicks(configuration_id: string) {

    if (!configuration_id)
      return

    this.spinner.show()

    // Get from yesterday on
    const yesterday_date = new Date()
    yesterday_date.setDate(yesterday_date.getDate() - 1)

    this.facade.loadTicks(configuration_id, {
      start_date: yesterday_date.toLocaleDateString(LOCALE)
    })
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe((ticks: Tick[]) => {
      this.buildDay(ticks)
    }, 
    (error) => {
      this.toastr.error('Something went wrong, please try again.', 'Oh no!', {
        positionClass: 'toast-bottom-center'
      })
    })
  }

  loadCustomTicks() {

    if (!this.configuration_id_custom || !this.dates.from == null || this.dates.to == null)
      return

    this.spinner.show()

    this.facade.loadTicks(this.configuration_id_custom, {
      start_date: new Date(this.dates.from.year, this.dates.from.month - 1, this.dates.from.day).toLocaleDateString(LOCALE),
      end_date: new Date(this.dates.to.year, this.dates.to.month - 1, this.dates.to.day).toLocaleDateString(LOCALE)
    })
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe((ticks: Tick[]) => {
      this.buildCustom(ticks)
    }, 
    (error) => {
      this.toastr.error('Something went wrong, please try again.', 'Oh no!', {
        positionClass: 'toast-bottom-center'
      })
    })
  }

  private buildDay(ticks : Tick[]) {

    ticks.reverse()

    // Starts with today
    this.chart_index = 1

    const today = new Date()

    // Yesterday data
    const yesterday_ticks = ticks.filter(t => new Date(t.date).getDate() < today.getDate())

    const yesterday_targets = yesterday_ticks.map(t => t.target)
    const yesterday_labels = yesterday_ticks.map(t => new Date(t.date).toLocaleTimeString(LOCALE).substring(0, 5))
    const yesterday_adcosts = yesterday_ticks.map(t => t.value)

    // Today data
    const today_ticks = ticks.filter(t => new Date(t.date).getDate() == today.getDate())

    const today_targets = today_ticks.map(t => t.target)
    const today_labels = today_ticks.map(t => new Date(t.date).toLocaleTimeString(LOCALE).substring(0, 5))
    const today_adcosts = today_ticks.map(t => t.value)

    // Both datasets to choose from
    this.datasets = [
      {
        target: yesterday_targets,
        label: yesterday_labels,
        data: yesterday_adcosts
      },
      {
        target: today_targets,
        label: today_labels,
        data: today_adcosts
      }
    ]

    // Build chart
    if (this.recentChart)
      this.recentChart.destroy()
      
    this.recentChart = this.buildChart('recentChart', today_adcosts, today_targets, today_labels)
  }

  private buildCustom(ticks : Tick[]) {

    ticks.reverse()

    // Format data
    const adcosts = ticks.map(t => t.value)
    const targets = ticks.map(t => t.target)
    const labels = ticks.map(t => {

      const date_str = new Date(t.date).toLocaleString(LOCALE)

      return `${date_str.substring(0, 5)}  ${date_str.substring(11, 16)}`
    })

    // Build chart
    if (this.customChart)
      this.customChart.destroy()

    this.customChart = this.buildChart('customChart', adcosts, targets, labels)
  }

  private buildChart(element, adcosts=[], targets=[], labels=[]) {

    const canvas : any = document.getElementById(element)
    const ctx = canvas.getContext("2d")

    const gradientStrokeRed = ctx.createLinearGradient(0,19,212,193);
    gradientStrokeRed.addColorStop(1, 'rgba(12,192,174,0.2)');
    gradientStrokeRed.addColorStop(0.4, 'rgba(12,192,174,0.0)');
    gradientStrokeRed.addColorStop(0, 'rgba(12,192,174,0)');

    var config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Ad Cost (%)",
          fill: true,
          backgroundColor: gradientStrokeRed,
          borderColor: '#0cbfae',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#0cbfae',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#0cbfae',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: adcosts,
        }, 
        {
          type: 'line',
          label: 'Target (%)',
          borderWidth: 1,
          borderColor: '#fff',
          pointRadius: 0,
          data: targets,
        }]
      },
      options: {

        maintainAspectRatio: false,
  
        legend: {
          display: true,
          position: 'top'
        },
  
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            }
          }],
  
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(233,32,16,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      }
    };

    return new Chart(ctx, config)
  }

  public updateRecentChart(tab) {

    if (!this.recentChart)
      return

    this.chart_index = tab

    this.recentChart.data.datasets[0].data = this.datasets[this.chart_index].data
    this.recentChart.data.datasets[1].data = this.datasets[this.chart_index].target
    this.recentChart.data.labels = this.datasets[this.chart_index].label

    this.recentChart.update();
  }

  public chooseConfigurationIdCustom(configuration_id : string) {
    this.configuration_id_custom = configuration_id
    this.loadCustomTicks()
  }

  public receiveDatePickerEvent(dates : object) {
    this.dates = dates
    this.loadCustomTicks()
  }
}
