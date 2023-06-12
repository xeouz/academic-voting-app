import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DataSnapshot } from '@angular/fire/database';
import { GoogleChartsService } from 'src/app/google-charts.service';
import { VjhsDatabaseService } from 'src/app/vjhs-database.service';
import { VjhsLoginService } from 'src/app/vjhs-login.service';

declare var google:any;

@Component({
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.css']
})
export class BargraphComponent implements OnInit, AfterViewInit {
  @Input() title = "";
  @Input() dataPath = "";
  id_str = "";

  constructor(private charts_service: GoogleChartsService, private db_service: VjhsDatabaseService, private login_service: VjhsLoginService) {}

  drawChart(data: any) {
    var options = {
      fontName: 'Ubuntu Mono',
      fontSize: 17,
      height: 320,
      width: 620,
      backgroundColor: {
        fill: 'transparent',
      },
      vAxis: {
        textPosition: 'none',
        gridlines: {
          color: 'transparent'
        }
      },
      hAxis: {
        textStyle: {
          bold: true,
        }
      },
      legend: {
        position: 'none'
      },
      chartArea: {width: '94%', height: '65%'},
    };

    this.charts_service.drawChart(data, options, "divBarChart"+this.id_str);
  }
  
  onDataChanged(data: any)
  {
    if(!this.login_service.isLoggedIn)
      return;
    
    let chartData = [
      ['Candidate', 'Votes', {role: 'style'}]
    ];

    let highest = 0;
    let highestData = 0;
    Object.keys(data).forEach((key, index, array) => {
      if (key == "total")
        return;
      
      let keystr = key;
      if (array.length>6)
        keystr = keystr.split(' ')[0];
      else if (keystr.length>14 || array.length>4)
        keystr = keystr.split(' ').join('\n');
      
      if(data[key] > highestData)
      {
        highest = index;
        highestData = data[key]
      }

      chartData.push([keystr, data[key], 'opacity: 0.45']);
    });
    console.log(chartData)
    chartData[highest+1][2] = 'opacity: 1';

    this.drawChart(chartData);
  }

  ngOnInit(): void {
    this.id_str = this.title.replaceAll('\\s', '');
  }

  ngAfterViewInit(): void {
    this.db_service.addDataListener("global_votes/"+this.dataPath, (snapshot: DataSnapshot) => {
      if(!this.login_service.isLoggedIn)
        return;
      this.onDataChanged(snapshot.val());
    });
  }
}
