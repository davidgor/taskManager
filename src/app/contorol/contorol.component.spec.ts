import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContorolComponent } from './contorol.component';

describe('ContorolComponent', () => {
  let component: ContorolComponent;
  let fixture: ComponentFixture<ContorolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContorolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContorolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
