import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VjhsLoginService {

  constructor() { }

  private loggedIn: boolean = true;
  private loginPassword: string = "test123";
  initLogin(password: string): boolean
  {
    if(this.loggedIn) return true;

    if(this.loginPassword == password)
    {
      this.loggedIn = true;
      return true;
    }
    
    return false;
  }
  resetLogin()
  {
    this.loggedIn = false;
  }
  isLoggedIn(): boolean
  {
    return this.loggedIn;
  }
}
