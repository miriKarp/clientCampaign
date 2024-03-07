import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterDetailsComponent } from './enter-details.component';

describe('EnterDetailsComponent', () => {
  let component: EnterDetailsComponent;
  let fixture: ComponentFixture<EnterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterDetailsComponent]
    });
    fixture = TestBed.createComponent(EnterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
