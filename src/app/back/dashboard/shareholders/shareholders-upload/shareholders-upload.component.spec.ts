import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdersUploadComponent } from './shareholders-upload.component';

describe('ShareholdersUploadComponent', () => {
  let component: ShareholdersUploadComponent;
  let fixture: ComponentFixture<ShareholdersUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholdersUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdersUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
