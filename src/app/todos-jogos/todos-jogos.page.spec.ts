import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosJogosPage } from './todos-jogos.page';

describe('TodosJogosPage', () => {
  let component: TodosJogosPage;
  let fixture: ComponentFixture<TodosJogosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosJogosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
