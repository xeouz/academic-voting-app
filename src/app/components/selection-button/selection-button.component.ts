import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-button',
  templateUrl: './selection-button.component.html',
  styleUrls: ['./selection-button.component.css']
})
export class SelectionButtonComponent {
  @Input('house') houseStr = "";

  navigateTo(page: string)
  {
    this.router.navigate(['/votings/houses/'+page]);
  }
  
  constructor(private router: Router) {}
}
