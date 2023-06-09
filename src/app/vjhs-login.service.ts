import { Injectable } from '@angular/core';
import { VjhsStorageService } from './vjhs-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VjhsLoginService {

  constructor(private stg_service: VjhsStorageService)
  {
    stg_service.retrieveStudentList(() => {
      this.loginPassword = stg_service.studentList['Password'];
      this.dataPassword = stg_service.studentList['DataPassword'];
    });
  }

  private loginMode: string = "data";
  private loggedIn: boolean = true;
  loginPassword: string = "";
  dataPassword: string = "";
  private loginCallbacks: CallableFunction[] = [];
  initLogin(password: string): string
  {
    if(this.loggedIn) return this.loginMode;
    if(this.loginPassword=="" || this.dataPassword=="")  return "";

    if(this.loginPassword == password)
    {
      this.loggedIn = true;
      this.loginMode = "login";
      this.loginCallbacks.forEach((val) => val());
      return "login";
    }
    else if(this.dataPassword == password)
    {
      this.loggedIn = true;
      this.loginMode = "data";
      this.loginCallbacks.forEach((val) => val());
      return "data";
    }
    
    return "";
  }
  resetLogin()
  {
    this.loggedIn = false;
  }
  isLoggedIn(): boolean
  {
    return this.loggedIn;
  }
  addLoginCallback(callback: CallableFunction)
  {
    this.loginCallbacks.push(callback);
  }
  checkPassword(pass: string): boolean
  {
    if(this.loginPassword == pass)
      return true;
    return false;
  }
  checkDataPassword(pass: string): boolean
  {
    if(this.dataPassword == pass)
      return true;
    return false;
  }
}
