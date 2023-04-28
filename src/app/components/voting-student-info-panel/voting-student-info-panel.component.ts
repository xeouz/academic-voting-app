import { Component, EventEmitter, Output } from '@angular/core';
import { VjhsDatabaseService } from 'src/app/vjhs-database.service';

@Component({
  selector: 'app-voting-student-info-panel',
  templateUrl: './voting-student-info-panel.component.html',
  styleUrls: ['./voting-student-info-panel.component.css']
})
export class VotingStudentInfoPanelComponent {
  selectedGrade = "";
  selectedDivision = "";
  @Output() onContinue: EventEmitter<any> = new EventEmitter();

  private invalidHouseErrorMessage = "10th-D does not exist.";
  selectGrade(grade: string)
  {
    if(grade=="X" && this.selectedDivision=="D")
    {
      alert(this.invalidHouseErrorMessage);
      return;
    }
    this.selectedGrade = grade;
    this.db_service.selectVoteGrade(grade);
  }
  selectDivision(division: string)
  {
    if(this.selectedGrade=="X" && division=="D")
    {
      alert(this.invalidHouseErrorMessage);
      return;
    }
    this.selectedDivision = division;
    this.db_service.selectVoteDivision(division);
  }

  onContinueClicked()
  {
    if(this.selectedGrade=="")
    {
      alert("You have not chosen your grade. Please make your selection");
      return;
    }
    else if(this.selectedDivision=="")
    {
      alert("You have not chosen your division. Please make your selection");
      return;
    }

    this.onContinue.emit();
  }

  constructor(private db_service: VjhsDatabaseService) {}
}
