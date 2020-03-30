import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveApplicationDialogComponent } from './remove-application-dialog.component';

describe('RemoveApplicationDialogComponent', () => {
  let component: RemoveApplicationDialogComponent;
  let fixture: ComponentFixture<RemoveApplicationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveApplicationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
