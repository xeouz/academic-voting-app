import { transition, trigger, style, state, animate, keyframes } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSnapshot } from 'firebase/database';
import { VjhsDatabaseService } from 'src/app/vjhs-database.service';
import { VjhsStorageService } from 'src/app/vjhs-storage.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

// Animations
const fadeReappear = trigger('fadeReappear', [
  state('hide', style({
    opacity: 0.25
  })),
  state('show', style({
    opacity: 1
  })),
  transition('show => hide', [animate('150ms ease-out')]),
  transition('hide => show', [animate('150ms ease-in')]),
]);
const smoothResize = trigger('smoothResize', [
  state('current', style({
    width: '{{currentWidth}}%',
  }), {params: {currentWidth: 1}}),
  state('grown', style({
    width: '{{newWidth}}%',
  }), {params: {newWidth: 1}}),
  transition("current => grown", animate("300ms ease-out")),
]);

@Component({
  selector: 'app-voting-panel',
  templateUrl: './voting-panel.component.html',
  styleUrls: ['./voting-panel.component.css'],
  animations: [fadeReappear, smoothResize],
})
export class VotingPanelComponent implements OnInit {
  screenTitleText = "";
  currentProgressBarCompletion = 5;
  newProgressBarCompletion = 5;
  titleAnimationState = false;
  progressBarAnimationState = false;
  @Input('house') houseText = "";

  isUsable = true;
  currentSelection = -1;
  maxSelection = 0;
  private selections = 
  ["", "Information", "Head Boy", "Head Girl", 
  "Cultural Captain", "Cultural Vice-Captain", "Sports Captain", 
  "Sports Vice-Captain", "House Captain", "House Vice-Captain"];
  private selectionData:any = {}
  private getTitle(btn: string) : string
  {
    switch(btn)
    {
      case "Information": return "Student Class Information";
      case "Head Boy": return "Vote for Head Boy";
      case "Head Girl": return "Vote for Head Girl";
      case "Cultural Captain": return "Vote for Cultural Captain";
      case "Cultural Vice-Captain": return "Vote for Cultural Vice-Captain";
      case "Sports Captain": return "Vote for Sports Captain";
      case "Sports Vice-Captain": return "Vote for Sports Vice-Captain";
      case "House Captain": return "Vote for "+this.houseText+" House Captain";
      case "House Vice-Captain": return "Vote for "+this.houseText+" House Vice-Captain";
      default: return "";
    }

    return "";
  }

  selectNavbar(index: number)
  {
    if(!this.isUsable)  return;
    if(index > this.maxSelection)
    {
      let dialogRef = this.dialog.open(ModalDialogComponent, {
        data: {
          title: 'Cannot Proceed!',
          text: "First complete your existing votes, and then you may move on to other votes",
        }
      });
      return;
    }
    if(index == this.currentSelection)  return;

    let str = this.selections[index];

    this.progressBarAnimationState = true;
    this.titleAnimationState = false;
    setTimeout(() => this.titleAnimationState = true, 150);
    setTimeout(() => {
      this.progressBarAnimationState = false;
      this.currentProgressBarCompletion = this.newProgressBarCompletion;
    }, 300);
    this.screenTitleText = this.getTitle(str);
    this.newProgressBarCompletion = ((index/10)*100);
    this.currentSelection = index;
  }

  navigateNextPanel()
  {
    this.maxSelection++;
    this.selectNavbar(this.currentSelection+1);
  }

  getStudentData(post_name: string): any
  {
    if (this.studentData == null)  return null;
    if (post_name == "House Captain" || post_name == "House Vice-Captain")
      post_name = this.houseText + " " + post_name;
    
    return this.studentData[post_name];
  }

  onSubmitClicked()
  {
    this.db_service.submitVote(this.houseText);
    this.navigateNextPanel();
    this.db_service.setHouseAllowance(this.houseText, false);
    this.isUsable = false;
  }

  onStartClicked()
  {
    this.maxSelection = 1;
    this.docElem.requestFullscreen();
    this.selectNavbar(1);
  }

  resetPanels()
  {
    this.maxSelection = 0;
    this.isUsable = true;
    this.selectNavbar(0);
  }

  onFullscreenChanged(event: Event)
  {
    this.db_service.setHouseFullscreen(this.houseText, document.fullscreenElement!=null);
    if(!document.fullscreenElement)
    {
      let dialogRef = this.dialog.open(ModalDialogComponent, {
        data: {
          title: 'Left Fullscreen!',
          text: "Please do not leave fullscreen.",
        }
      });
      if(this.currentSelection < 11)
        this.resetPanels();

      let audio = new Audio();
      audio.src = "../assets/beep.mp3";
      audio.load();
      audio.play();
      return;
    }
  }

  constructor(private stg_service: VjhsStorageService, private db_service: VjhsDatabaseService, private dialog: MatDialog) {}
  docElem: HTMLElement = document.documentElement;
  
  studentData: any;
  ngOnInit(): void {
    this.docElem = document.documentElement;
    this.docElem.addEventListener("fullscreenchange", (event) => this.onFullscreenChanged(event));

    this.db_service.isHouseOpen(this.houseText, (data: boolean) => {
      if(data)
      {
        this.isUsable = false;
        this.currentSelection = 12;
      }
      this.db_service.setHouseOpen(this.houseText, true);
    });

    this.stg_service.retrieveStudentList(() => {
      this.studentData = this.stg_service.studentList;
    });

    this.db_service.addHouseListener(this.houseText, (snapshot: DataSnapshot) => {
      const allow = snapshot.val();
      console.log(allow)
      if(allow == true)
        this.resetPanels();
    });

    this.currentSelection = 11;
    this.newProgressBarCompletion = 0;
    this.isUsable = false;
  }
}
