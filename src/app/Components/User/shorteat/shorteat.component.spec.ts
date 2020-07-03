import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorteatComponent } from './shorteat.component';

describe('ShorteatComponent', () => {
  let component: ShorteatComponent;
  let fixture: ComponentFixture<ShorteatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShorteatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShorteatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
