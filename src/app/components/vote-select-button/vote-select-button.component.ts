import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vote-select-button',
  templateUrl: './vote-select-button.component.html',
  styleUrls: ['./vote-select-button.component.css']
})
export class VoteSelectButtonComponent {
  @Input() isSelected = "true";
  @Input() imagePath = "";
  @Input() imageFooter = "";
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  onButtonClick()
  {
    this.onClick.emit();
  }
}
