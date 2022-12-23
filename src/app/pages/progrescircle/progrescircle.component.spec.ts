import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrescircleComponent } from './progrescircle.component';

describe('ProgrescircleComponent', () => {
  let component: ProgrescircleComponent;
  let fixture: ComponentFixture<ProgrescircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrescircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrescircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
