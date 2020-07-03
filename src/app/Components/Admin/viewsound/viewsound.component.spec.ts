import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsoundComponent } from './viewsound.component';

describe('ViewsoundComponent', () => {
  let component: ViewsoundComponent;
  let fixture: ComponentFixture<ViewsoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
