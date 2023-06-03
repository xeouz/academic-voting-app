import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingStudentInfoPanelComponent } from './voting-student-info-panel.component';

describe('VotingStudentInfoPanelComponent', () => {
  let component: VotingStudentInfoPanelComponent;
  let fixture: ComponentFixture<VotingStudentInfoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingStudentInfoPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingStudentInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
