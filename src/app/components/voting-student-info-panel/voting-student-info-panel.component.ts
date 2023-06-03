import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSnapshot } from 'firebase/database';
import { VjhsDatabaseService } from 'src/app/vjhs-database.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-voting-student-info-panel',
  templateUrl: './voting-student-info-panel.component.html',
  styleUrls: ['./voting-student-info-panel.component.css']
})
export class VotingStudentInfoPanelComponent implements OnInit {
  selectedGrade = "";
  selectedDivision = "";
  availableGrades: string[] = [];
  @Input() house = "";
  @Output() onContinue: EventEmitter<any> = new EventEmitter();

  selectGrade(grade: string)
  {
    this.availableDivisions = this.db_service.getAvailableDivisions(grade);

    this.selectedGrade = grade;
    this.selectedDivision = "";
    this.db_service.selectVoteGrade(grade);
  }
  selectDivision(division: string)
  {
    this.selectedDivision = division;
    this.db_service.selectVoteDivision(division);
  }

  availableDivisions = "G";
  isDivisionButtonDisabled(division: string): boolean
  {
    if (division.charCodeAt(0) > this.availableDivisions.charCodeAt(0))
      return true;
    return false;
  }
  getGradeButtonColor(grade: string): string
  {
    if(this.selectedGrade == grade)
      return 'rgba(255, 255, 255, 1)';
    else
      return 'rgba(255, 255, 255, 0.4)';
  }
  getDivisionButtonColor(division: string): string
  {
    if (this.isDivisionButtonDisabled(division))
      return 'rgba(168, 168, 168, 0.4)'

    if (this.selectedDivision == division)
      return 'rgba(245, 220, 255, 1)';
    else
      return 'rgba(233, 213, 255, 0.4)';
  }

  onContinueClicked()
  {
    if(this.selectedGrade=="")
    {
      let dialogRef = this.dialog.open(ModalDialogComponent, {
        data: {
          title: 'Cannot Proceed!',
          text: "You have not chosen your grade. Please make your selection",
        }
      });
      return;
    }
    else if(this.selectedDivision=="")
    {
      let dialogRef = this.dialog.open(ModalDialogComponent, {
        data: {
          title: 'Cannot Proceed!',
          text: "You have not chosen your division. Please make your selection",
        }
      });
      return;
    }

    this.onContinue.emit();
  }

  reset()
  {
    this.selectedDivision = "";
    this.selectedGrade = "";
    this.availableDivisions = "G";
  }

  constructor(private db_service: VjhsDatabaseService, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.reset();
    this.availableGrades = this.db_service.getAvailableGrades();

    this.db_service.addHouseListener(this.house, (snapshot: DataSnapshot) => {
      const allow = snapshot.val();
      if(allow == true)
        this.reset();
    })
  }
}
