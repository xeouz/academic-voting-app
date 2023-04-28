import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideDatabase, getDatabase } from '@angular/fire/database'

import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SelectionButtonComponent } from './components/selection-button/selection-button.component';
import { HousePageComponent } from './components/house-page/house-page.component';
import { VotingPanelComponent } from './components/voting-panel/voting-panel.component';
import { VotingStudentInfoPanelComponent } from './components/voting-student-info-panel/voting-student-info-panel.component';
import { VotingElectionPanelComponent } from './components/voting-election-panel/voting-election-panel.component';
import { VoteSelectButtonComponent } from './components/vote-select-button/vote-select-button.component';
import { environment } from 'src/environments/environment.development';
import { HttpClientModule } from '@angular/common/http';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { AuthLoginPageComponent } from './components/auth-login-page/auth-login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SelectionButtonComponent,
    HousePageComponent,
    VotingPanelComponent,
    VotingStudentInfoPanelComponent,
    VotingElectionPanelComponent,
    VoteSelectButtonComponent,
    AuthPageComponent,
    AuthLoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
