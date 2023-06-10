import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSnapshot } from '@angular/fire/database';
import { VjhsDatabaseService } from 'src/app/vjhs-database.service';
import { VjhsLoginService } from 'src/app/vjhs-login.service';
import { VjhsStorageService } from 'src/app/vjhs-storage.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  isAuthPanelExpanded = false;
  redHouseNeedsAuth = false;
  blueHouseNeedsAuth = false;
  greenHouseNeedsAuth = false;
  yellowHouseNeedsAuth = false;

  fullscreen = {
    red: false, blue: false, green: false, yellow: false,
  }
  authTexts = {
    auth_ongoing: "Voting session ongoing, already authorized",
    auth_done: "Voting finished, requesting authorization to continue...",
  }
  redAuthText = "Voting yet to begin, already authorized.";
  blueAuthText = "Voting yet to begin, already authorized.";
  greenAuthText = "Voting yet to begin, already authorized.";
  yellowAuthText = "Voting yet to begin, already authorized.";

  constructor(private login_service: VjhsLoginService, private db_service: VjhsDatabaseService, private storage_service: VjhsStorageService, private router: Router) {}

  onAuthPanelClicked()
  {
    this.isAuthPanelExpanded = !this.isAuthPanelExpanded;
  }
  onResetButtonClicked()
  {
    if (confirm("Are you sure? Doing this will clear all the voting data."))
    {
      let pass = prompt("Enter the authorizer password");
      if (pass == null)
        pass = "";
      
      if (!this.login_service.checkPassword(pass))
      {
        alert("Invalid Password! Failed to clear data");
        return;
      }

      this.db_service.clearData();
      alert("All voting data was cleared");
    }
  }

  onRedAuthButtonClicked()
  {
    if(!this.redHouseNeedsAuth) return;
    this.setHouseAuth('red', false);
    this.db_service.setHouseAllowance('red', true);
  }
  onBlueAuthButtonClicked()
  {
    if(!this.blueHouseNeedsAuth) return;
    this.setHouseAuth('blue', false);
    this.db_service.setHouseAllowance('blue', true);
  }
  onGreenAuthButtonClicked()
  {
    if(!this.greenHouseNeedsAuth) return;
    this.setHouseAuth('green', false);
    this.db_service.setHouseAllowance('green', true);
  }
  onYellowAuthButtonClicked()
  {
    if(!this.yellowHouseNeedsAuth) return;
    this.setHouseAuth('yellow', false);
    this.db_service.setHouseAllowance('yellow', true);
  }

  private setHouseAuth(house: string, needs_auth: boolean)
  {
    let auth_text: string;
    if(needs_auth)
      auth_text = this.authTexts.auth_done;
    else
      auth_text = this.authTexts.auth_ongoing;

    switch(house)
    {
      case 'red': {
        this.redHouseNeedsAuth = needs_auth;
        this.redAuthText = auth_text;
      } break;
      case 'blue': {
        this.blueHouseNeedsAuth = needs_auth;
        this.blueAuthText = auth_text;
      } break;
      case 'green': {
        this.greenHouseNeedsAuth = needs_auth;
        this.greenAuthText = auth_text;
      } break;
      case 'yellow': {
        this.yellowHouseNeedsAuth = needs_auth;
        this.yellowAuthText = auth_text;
      } break;
    }
  }

  ngOnInit(): void {
    if(!this.login_service.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.db_service.addHouseListener('red', (snapshot: DataSnapshot) => {
      let allow = snapshot.val();
      if (allow == false)
        this.setHouseAuth('red', true);
    });
    this.db_service.addHouseListener('blue', (snapshot: DataSnapshot) => {
      let allow = snapshot.val();
      if (allow == false)
        this.setHouseAuth('blue', true);
    });
    this.db_service.addHouseListener('green', (snapshot: DataSnapshot) => {
      let allow = snapshot.val();
      if (allow == false)
        this.setHouseAuth('green', true);
    });
    this.db_service.addHouseListener('yellow', (snapshot: DataSnapshot) => {
      let allow = snapshot.val();
      if (allow == false)
        this.setHouseAuth('yellow', true);
    });
    this.db_service.addHouseFullscreenListener('red', (snapshot: DataSnapshot) => {
      this.fullscreen.red = snapshot.val();
    });
    this.db_service.addHouseFullscreenListener('blue', (snapshot: DataSnapshot) => {
      this.fullscreen.blue = snapshot.val();
    });
    this.db_service.addHouseFullscreenListener('green', (snapshot: DataSnapshot) => {
      this.fullscreen.green = snapshot.val();
    });
    this.db_service.addHouseFullscreenListener('yellow', (snapshot: DataSnapshot) => {
      this.fullscreen.yellow = snapshot.val();
    });
  }
}
