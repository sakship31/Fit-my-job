import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeduComponent } from './addedu.component';

describe('AddeduComponent', () => {
  let component: AddeduComponent;
  let fixture: ComponentFixture<AddeduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
