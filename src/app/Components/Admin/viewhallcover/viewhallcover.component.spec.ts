import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhallcoverComponent } from './viewhallcover.component';

describe('ViewhallcoverComponent', () => {
  let component: ViewhallcoverComponent;
  let fixture: ComponentFixture<ViewhallcoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewhallcoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewhallcoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
