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
  @Input() isLast = "false";
  @Input() house = "";
  @Output() onContinue: EventEmitter<any> = new EventEmitter();

  firstButtonClass = "first-button";
  otherButtonClass = "other-button";
  flexPadding = "8rem";
  students: {name: string, image: string}[] = [];
  images = new Map<string, string>();

  isButtonSelected(button_indx: number): string
  {
    if(this.selectedPerson == -1) return "true";
    return (this.selectedPerson == button_indx)?'true':'false';
  }

  getImage(name: string): string
  {
    let img = this.images.get(name);
    if(img == undefined)
      return "/assets/placeholder.png";
    return img;
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

  getFlexPercent(): string
  {
    if(this.students.length < 5)
    {
      // 2 per row
      return "50%";
    }
    else if(this.students.length < 6)
    {
      return "20%";
    }
    else if(this.students.length < 9)
    {
      // 4 per row
      return "21%"
    }
    else if(this.students.length < 15)
    {
      return "20%";
    }

    return "0%";
  }

  constructor(private db_service: VjhsDatabaseService, private stg_service: VjhsStorageService, private dialog: MatDialog) {}

  ngOnInit(): void
  {
    this.db_service.addHouseListener(this.house, (snapshot: DataSnapshot) => {
      const allow = snapshot.val();
      if(allow == true)
        this.reset();
    });

    this.stg_service.retrieveStudentList(() => {
      let postName = this.post;
      if(postName.startsWith("House"))
        postName = this.house + " " + postName;
      
      this.students = this.stg_service.studentList[postName];
      let width = window.outerWidth;
      if(this.students.length < 5)
      {
        if(width>800)
          this.flexPadding = "20rem";
        else
          this.flexPadding = "0rem";
        this.firstButtonClass = "first-button";
        this.otherButtonClass = "other-button";
      }
      else if(this.students.length < 6)
      {
        if(width>800)
          this.flexPadding = "8rem";
        else
          this.flexPadding = "2.5rem";
        this.firstButtonClass = "first-button-sm";
        this.otherButtonClass = "other-button-sm";
      }
      else if(this.students.length < 9)
      {
        if(width>800)
          this.flexPadding = "1rem";
        else
          this.flexPadding = "20rem";
        this.firstButtonClass = "first-button-sm";
        this.otherButtonClass = "other-button-sm";
      }
      else if(this.students.length < 15)
      {
        if(width>800)
          this.flexPadding = "8rem";
        else
          this.flexPadding = "2.5rem";
        this.firstButtonClass = "first-button-sm";
        this.otherButtonClass = "other-button-sm";
      }

      this.students.forEach((value) => {
        if(value == undefined) return;
        
        this.stg_service.getImageURL(value.image).then((url) => {
          if(url == '')
            url = '/assets/placeholder.png'

          this.images.set(value.name, url);
          
          var img = new Image();
          img.src = url;
        });
      });
    });
  }
}
