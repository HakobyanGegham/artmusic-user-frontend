import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalContentComponent } from './festival-content.component';

describe('FestivalContentComponent', () => {
  let component: FestivalContentComponent;
  let fixture: ComponentFixture<FestivalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestivalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
