import { Injectable } from '@angular/core';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleChartsService {

  chartQueue: any[] = [];
  isLoaded = false;
  drawChart(data:any, options:any, containerId: string)
  {
    if(!this.isLoaded)
    {
      this.chartQueue.push({data:data, options:options, containerId: containerId});
      return;
    }
    
    var chart = new google.visualization.ColumnChart(document.getElementById(containerId));
    chart.draw(google.visualization.arrayToDataTable(data), options);
  }

  drawAllCharts()
  {
    this.isLoaded = true;

    this.chartQueue.forEach((ch:any) => {
      this.drawChart(ch.data, ch.options, ch.containerId);
    })
    this.chartQueue = [];
  }

  constructor() {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(() => this.drawAllCharts());
  }
}
