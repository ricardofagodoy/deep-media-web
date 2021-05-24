import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { DashboardFacade } from './dashboard.facade';
import { take } from 'rxjs/internal/operators';
import { Performance } from 'src/app/models/Performance';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {

  private gradientChartOptionsConfigurationWithTooltipRed : any
  private gradientChartOptionsConfigurationWithTooltipGreen: any

  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = false;
  public clicked1: boolean = true;

  constructor(private facade: DashboardFacade) {

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
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
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

    this.facade.performance$
      .subscribe((performance: Performance) => {
        this.buildDay(performance.today, performance.yeserday)
        this.buildWeek(performance.week)
        this.buildMonth(performance.month)
      })
  }

  private buildDay(today, yesterday) {

    // Data
    var daily_labels = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];
    this.datasets = [yesterday, today];
    const ad_cost_meta = Array(daily_labels.length).fill(100)

    this.data = this.datasets[1];

    const canvas : any = document.getElementById("chartBig1");
    const ctx = canvas.getContext("2d");

    const gradientStrokeRed = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeRed.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStrokeRed.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStrokeRed.addColorStop(0, 'rgba(233,32,16,0)');

    var config = {
      type: 'line',
      data: {
        labels: daily_labels,
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
          data: this.data,
        }, {
          type: 'line',
          label: 'Ad Cost Target',
          borderWidth: 1,
          borderColor: '#fff',
          pointRadius: 0,
          data: ad_cost_meta,
        }]
      },
      options: this.gradientChartOptionsConfigurationWithTooltipRed
    };

    this.myChartData = new Chart(ctx, config);
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
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}
