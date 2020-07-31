import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { ITodos } from "../interface/todos.interface";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  todos: ITodos[] = [];
  todo: ITodos = { _id: "", title: "", completed: false };
  isEdit = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.api.get(`todos`).subscribe((todos: ITodos[]) => (this.todos = todos));
  }

  addTodo() {
    this.api.post(`todos`, { title: this.todo.title, completed: false }).subscribe(() => {
      this.todo = { _id: "", title: "", completed: false };
      return this.getTodos();
    });
  }

  updateTodo() {
    const todo = { ...this.todo };
    this.api.patch(`todos/${this.todo._id}`, todo).subscribe(() => {
      this.todo = { _id: "", title: "", completed: false };
      return this.getTodos();
    });
  }

  deleteTodo(id: string) {
    this.api.delete(`todos/${id}`).subscribe(() => this.getTodos());
  }

  editTodo(todo: ITodos) {
    this.isEdit = true;
    this.todo = todo;
  }

  onChange(todo: ITodos, event: Event) {
    const check = (event.target as HTMLInputElement).checked;
    this.todo = { ...todo, completed: !check };
    this.updateTodo();
  }
}
