import { Component, Input, OnInit } from '@angular/core';
import { VjhsDatabaseService } from 'src/app/vjhs-database.service';
import { DataSnapshot } from '@angular/fire/database';

@Component({
  selector: 'app-class-data',
  templateUrl: './class-data.component.html',
  styleUrls: ['./class-data.component.css']
})
export class ClassDataComponent implements OnInit {
  classData: any = null;
  shownData: any = null;
  selectedGrade = "VI";

  hasDataArrived = false;
  onDataArrival(data: any)
  {
    this.hasDataArrived = true;
    this.classData = data;
    this.onGradeButtonClicked(this.selectedGrade);
  }
  
  availableDivisions = "G";
  listAvailableDivisions: string[] = [];
  getDivisionData(division: string): any
  {
    division = division.toLowerCase();
    let key = 'div_'+division;
    if(this.shownData && this.shownData[key])
    {
      return this.shownData[key];
    }
    return {red:-1, blue:-1, green:-1, yellow:-1, total:-1};
  }
  getVotes(division: string): any
  {
    division = division.toLowerCase();
    let key = 'div_'+division;
    if(!this.shownData || !this.shownData[key])
      return;
    
    if(this.shownData[key]['votes'])
      return this.shownData[key]['votes']
    
    return [];
  }
  getAvailableDivisions(): string[]
  {
    return this.listAvailableDivisions;
  }
  getAvailableGrades(): string[]
  {
    return this.db_service.getAvailableGrades();
  }
  onGradeButtonClicked(grade: string)
  {
    this.selectedGrade = grade;
    
    if(this.classData)
      this.shownData = this.classData['grade_'+this.selectedGrade.toLowerCase()];

    if(this.shownData == null || this.shownData == undefined)
      return;

    this.availableDivisions = this.db_service.getAvailableDivisions(grade);
    this.listAvailableDivisions = [];
    for(let c='A'.charCodeAt(0); c<=this.availableDivisions.charCodeAt(0); c++)
    {
      this.listAvailableDivisions.push(String.fromCharCode(c));
    }
  }

  constructor(private db_service: VjhsDatabaseService) {}

  ngOnInit(): void {
    this.availableDivisions = this.db_service.getAvailableDivisions(this.selectedGrade);

    this.db_service.addDataListener("class_votes", (snapshot: DataSnapshot) => this.onDataArrival(snapshot.val()));
    this.onGradeButtonClicked("VI");
  }
}
