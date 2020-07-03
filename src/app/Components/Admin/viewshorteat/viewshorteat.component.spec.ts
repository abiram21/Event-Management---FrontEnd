import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewshorteatComponent } from './viewshorteat.component';

describe('ViewshorteatComponent', () => {
  let component: ViewshorteatComponent;
  let fixture: ComponentFixture<ViewshorteatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewshorteatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewshorteatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
