import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAddConfirmDialogComponent } from './application-add-confirm-dialog.component';

describe('ApplicationAddConfirmDialogComponent', () => {
  let component: ApplicationAddConfirmDialogComponent;
  let fixture: ComponentFixture<ApplicationAddConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAddConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAddConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
