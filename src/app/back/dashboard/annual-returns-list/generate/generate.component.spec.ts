import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAnnualReturnComponent } from './generate.component';

describe('GenerateCR6Component', () => {
  let component: GenerateAnnualReturnComponent;
  let fixture: ComponentFixture<GenerateAnnualReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAnnualReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAnnualReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
