import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VjhsLoginService } from 'src/app/vjhs-login.service';
@Component({
  selector: 'app-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  styleUrls: ['./auth-login-page.component.css']
})
export class AuthLoginPageComponent {
  inputPassword:string | null = "";
  invalidPassword = false;

  constructor(private login_service: VjhsLoginService, private router: Router) {}

  onInputKeyUp(event: any)
  {
    this.inputPassword = event.target.value;
  }

  onConfirmClicked()
  {
    this.invalidPassword = false;
    if(this.inputPassword == null)  this.inputPassword = "";
    if(this.login_service.initLogin(this.inputPassword as string))
    {
      this.router.navigate(['auth']);
    }
    else
    {
      this.invalidPassword = true;
    }
  }
}
