import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprofileComponent } from './updateprofile.component';

describe('UpdateprofileComponent', () => {
  let component: UpdateprofileComponent;
  let fixture: ComponentFixture<UpdateprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
