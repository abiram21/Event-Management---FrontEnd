import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddphotographyComponent } from './addphotography.component';

describe('AddphotographyComponent', () => {
  let component: AddphotographyComponent;
  let fixture: ComponentFixture<AddphotographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddphotographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddphotographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
