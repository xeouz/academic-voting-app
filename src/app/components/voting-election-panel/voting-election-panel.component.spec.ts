import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingElectionPanelComponent } from './voting-election-panel.component';

describe('VotingElectionPanelComponent', () => {
  let component: VotingElectionPanelComponent;
  let fixture: ComponentFixture<VotingElectionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingElectionPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingElectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
