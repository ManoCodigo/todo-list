import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInputAddListComponent } from './todo-input-add-list.component';

describe('TodoInputAddListComponent', () => {
  let component: TodoInputAddListComponent;
  let fixture: ComponentFixture<TodoInputAddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoInputAddListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInputAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
