import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmemorialComponent } from './viewmemorial.component';

describe('ViewmemorialComponent', () => {
  let component: ViewmemorialComponent;
  let fixture: ComponentFixture<ViewmemorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmemorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
