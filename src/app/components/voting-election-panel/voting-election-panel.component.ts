import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSnapshot } from 'firebase/database';
import { VjhsDatabaseService } from 'src/app/vjhs-database.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { VjhsStorageService } from 'src/app/vjhs-storage.service';

@Component({
  selector: 'app-voting-election-panel',
  templateUrl: './voting-election-panel.component.html',
  styleUrls: ['./voting-election-panel.component.css']
})
export class VotingElectionPanelComponent implements OnInit {
  selectedPerson = -1;
  @Input() post = "";
  @Input() students: {name:string, image:string}[] = [];
  @Input() isLast = "false";
  @Input() house = "";
  @Output() onContinue: EventEmitter<any> = new EventEmitter();

  images: Map<string, string> = new Map<string, string>();

  isButtonSelected(button_indx: number): string
  {
    if(this.selectedPerson == -1) return "true";
    return (this.selectedPerson == button_indx)?'true':'false';
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
      let dialogRef = this.dialog.open(ModalDialogComponent, {
        data: {
          title: 'Cannot Proceed!',
          text: "You have not selected your vote. If you do not want to vote anyone, then please click on \"None of the above\"",
        }
      });
      return;
    }

    this.onContinue.emit();  
  }

  reset()
  {
    this.selectedPerson = -1;
  }

  constructor(private db_service: VjhsDatabaseService, private stg_service: VjhsStorageService, private dialog: MatDialog) {}
  
  ngOnInit(): void
  {
    this.db_service.addHouseListener(this.house, (snapshot: DataSnapshot) => {
      const allow = snapshot.val();
      if(allow == true)
        this.reset();
    });
  }
}
