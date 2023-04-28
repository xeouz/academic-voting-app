import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VjhsLoginService } from 'src/app/vjhs-login.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  isAuthPanelExpanded = true;
  redHouseNeedsAuth = true;

  authTexts = {
    red_auth_ongoing: "Voting session ongoing, already authorized",
    red_auth_done: "Voting finished, requesting authorization to continue...",
  }
  redAuthText = "Voting yet to being, already authorized.";

  constructor(private login_service: VjhsLoginService, private router: Router) {}

  onAuthPanelClicked()
  {
    this.isAuthPanelExpanded = !this.isAuthPanelExpanded;
  }

  onRedAuthButtonClicked()
  {
    if(!this.redHouseNeedsAuth) return;

    this.redHouseNeedsAuth = false;
    this.redAuthText = this.authTexts.red_auth_ongoing;
  }

  ngOnInit(): void {
    if(!this.login_service.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }
  }
}
