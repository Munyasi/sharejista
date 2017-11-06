import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReturnsListComponent } from './annual-returns-list.component';

describe('AnnualReturnsListComponent', () => {
  let component: AnnualReturnsListComponent;
  let fixture: ComponentFixture<AnnualReturnsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualReturnsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualReturnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
