import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddshorteatComponent } from './addshorteat.component';

describe('AddshorteatComponent', () => {
  let component: AddshorteatComponent;
  let fixture: ComponentFixture<AddshorteatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddshorteatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddshorteatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
