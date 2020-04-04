import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateApplicationComponent } from './add-update-application.component';

describe('AddApplicationComponent', () => {
  let component: AddUpdateApplicationComponent;
  let fixture: ComponentFixture<AddUpdateApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
