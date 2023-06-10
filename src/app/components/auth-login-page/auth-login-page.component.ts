import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VjhsLoginService } from 'src/app/vjhs-login.service';
@Component({
  selector: 'app-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  styleUrls: ['./auth-login-page.component.css']
})
export class AuthLoginPageComponent implements OnInit {
  inputPassword:string | null = "";
  invalidPassword = false;

  constructor(private login_service: VjhsLoginService, private router: Router) {}

  isAlphaNumeric(str: string) {
    let code = str.charCodeAt(0);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
    return true;
  };
  
  onInputKeyUp(event: any)
  {
    if(event.key == "Enter")
      this.onConfirmClicked();

    let str = new String(event.target.value).toString();
    if(this.isAlphaNumeric(str))
      this.inputPassword = str;
  }

  onConfirmClicked()
  {
    this.invalidPassword = false;
    if(this.inputPassword == null)  this.inputPassword = "";

    let result = this.login_service.initLogin(this.inputPassword as string);
    if(result == "login")
    {
      this.router.navigate(['auth']);
    }
    else if(result == "data")
    {
      this.router.navigate(['data']);
    }
    else
    {
      this.invalidPassword = true;
    }
  }

  ngOnInit(): void {

  }
}
