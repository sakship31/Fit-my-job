import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatejobComponent } from './createjob.component';

describe('CreatejobComponent', () => {
  let component: CreatejobComponent;
  let fixture: ComponentFixture<CreatejobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatejobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatejobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
