import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepicComponent } from './updatepic.component';

describe('UpdatepicComponent', () => {
  let component: UpdatepicComponent;
  let fixture: ComponentFixture<UpdatepicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatepicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
