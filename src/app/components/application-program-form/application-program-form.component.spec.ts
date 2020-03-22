import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProgramFormComponent } from './application-program-form.component';

describe('ApplicationProgramFormComponent', () => {
  let component: ApplicationProgramFormComponent;
  let fixture: ComponentFixture<ApplicationProgramFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationProgramFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
