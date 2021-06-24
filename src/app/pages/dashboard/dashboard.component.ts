import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { DashboardFacade } from './dashboard.facade';
import { Performance } from 'src/app/models/Performance';
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { Configuration } from "src/app/models/configuration";
import { Optimization } from "src/app/models/optimization";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.styles.scss"]
})
export class DashboardComponent implements OnInit {

  configurations : Observable<Configuration[]>

  private gradientChartOptionsConfigurationWithTooltipRed : any
  private gradientChartOptionsConfigurationWithTooltipGreen: any

  public datasets: any;
  public data: any;
  public chart_index : number
  public myChartData;
  public clicked: boolean = false;
  public clicked1: boolean = true;

  constructor(private facade: DashboardFacade, 
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {

    this.gradientChartOptionsConfigurationWithTooltipRed = {

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

    this.gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false
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
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],
  
        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    }
  }

  ngOnInit() {

    // Starts focusing on today
    this.chart_index = 1

    this.spinner.show()

    this.configurations = this.facade.loadConfiguration()
      .pipe(finalize(() => this.spinner.hide()))
  }

  loadConfigurationMetrics(configuration_id: string) {

    if (!configuration_id)
      return

    this.spinner.show()

    this.facade.loadPerformance(configuration_id)
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe((performance: Performance) => {
      this.buildDay(performance.today.reverse(), performance.yeserday.reverse())
      // this.buildWeek(performance.week)
      // this.buildMonth(performance.month)
    }, 
    (error) => {
      this.toastr.error('Something went wrong, please try again.', 'Oh no!', {
        positionClass: 'toast-bottom-center'
      })
    })
  }

  private buildDay(today: Optimization[], yesterday: Optimization[]) {

    // Format data
    const yesterday_target = yesterday.map(t => t.target*100)
    const yesterday_label = yesterday.map(t => t.date.substr(11))
    const yesterday_data = yesterday.map(t => t.ad_cost*100)

    const today_target = today.map(t => t.target*100)
    const today_label = today.map(t => t.date.substr(11))
    const today_data = today.map(t => t.ad_cost*100)

    this.datasets = [
      {
        target: yesterday_target,
        label: yesterday_label,
        data: yesterday_data
      },
      {
        target: today_target,
        label: today_label,
        data: today_data
      }
    ]

    const canvas : any = document.getElementById("chartBig1");
    const ctx = canvas.getContext("2d");

    const gradientStrokeRed = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeRed.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStrokeRed.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStrokeRed.addColorStop(0, 'rgba(233,32,16,0)');

    var config = {
      type: 'line',
      data: {
        labels: undefined,
        datasets: [{
          label: "Ad Cost",
          fill: true,
          backgroundColor: gradientStrokeRed,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: undefined,
        }, 
        {
          type: 'line',
          label: 'Ad Cost Target',
          borderWidth: 1,
          borderColor: '#fff',
          pointRadius: 0,
          data: undefined,
        }]
      },
      options: this.gradientChartOptionsConfigurationWithTooltipRed
    };

    this.myChartData = new Chart(ctx, config)

    // Add data to chart
    this.updateOptions()
  }

  private buildWeek(week_data) {

    // Chart week
    const canvas : any = document.getElementById("chartLineGreen")
    const ctx = canvas.getContext("2d");

    const gradientStrokeGreen = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeGreen.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStrokeGreen.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStrokeGreen.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    // Data
    const week_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    var data_week = {
      labels: week_labels,
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStrokeGreen,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: week_data,
      }]
    };

    new Chart(ctx, {
      type: 'line',
      data: data_week,
      options: this.gradientChartOptionsConfigurationWithTooltipGreen
    });
  }

  private buildMonth(month_data) {

    // Month
    const canvas : any = document.getElementById("chartLineGreenMonth");
    const ctx = canvas.getContext("2d");

    const gradientStrokeGreen = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeGreen.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStrokeGreen.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStrokeGreen.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    // Data
    const month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']

    var data_month = {
      labels: month_labels,
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStrokeGreen,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: month_data,
      }]
    };

    new Chart(ctx, {
      type: 'line',
      data: data_month,
      options: this.gradientChartOptionsConfigurationWithTooltipGreen
    });
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.datasets[this.chart_index].data
    this.myChartData.data.datasets[1].data = this.datasets[this.chart_index].target
    this.myChartData.data.labels = this.datasets[this.chart_index].label

    this.myChartData.update();
  }
}
