import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewphotographyComponent } from './viewphotography.component';

describe('ViewphotographyComponent', () => {
  let component: ViewphotographyComponent;
  let fixture: ComponentFixture<ViewphotographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewphotographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewphotographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
