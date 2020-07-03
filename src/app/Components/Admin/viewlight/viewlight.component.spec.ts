import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlightComponent } from './viewlight.component';

describe('ViewlightComponent', () => {
  let component: ViewlightComponent;
  let fixture: ComponentFixture<ViewlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
