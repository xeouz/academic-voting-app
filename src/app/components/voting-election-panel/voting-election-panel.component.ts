import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DataSnapshot } from 'firebase/database';
import { VjhsDatabaseService } from 'src/app/vjhs-database.service';

@Component({
  selector: 'app-voting-election-panel',
  templateUrl: './voting-election-panel.component.html',
  styleUrls: ['./voting-election-panel.component.css']
})
export class VotingElectionPanelComponent implements OnInit {
  selectedPerson = -1;
  @Input() post = "";
  @Input() students: any;
  @Input() isLast = "false";
  @Output() onContinue: EventEmitter<any> = new EventEmitter();

  isButtonSelected(button_indx: number): string
  {
    if(this.selectedPerson == -1) return "true";
    return (this.selectedPerson == button_indx)?'true':'false';
  }

  getImagePath(button_indx: number): string
  {
    if(this.students == null || this.students == undefined) return "";
    return this.students[button_indx]['image'];
  }

  getImageFooter(button_indx: number): string
  {
    if(this.students == null || this.students == undefined) return "";
    return this.students[button_indx]['name'];
  }

  selectVote(person: number)
  {
    this.selectedPerson = person;

    if(this.selectedPerson != 0)
      this.db_service.addVote(this.post, this.getImageFooter(this.selectedPerson-1));
  }

  onContinueClicked()
  {
    if(this.selectedPerson == -1)
    {
      alert("You have not selected your vote. If you do not want to vote anyone, then please click on \"None of the above\"");
      return;
    }

    this.onContinue.emit();  
  }

  reset()
  {
    this.selectedPerson = -1;
  }

  constructor(private db_service: VjhsDatabaseService) {}

  ngOnInit(): void
  {
    this.db_service.addHouseListener('', (snapshot: DataSnapshot) => {
      const allow = snapshot.val();
      if(allow == true)
        this.reset();
    })
  }
}
