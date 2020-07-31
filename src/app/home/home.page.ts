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
  title = "";

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.api.get(`todos`).subscribe((todos: ITodos[]) => (this.todos = todos));
  }

  addTodo() {
    const body = { title: this.title, completed: false };
    this.api.post(`todos`, body).subscribe(() => {
      this.title = "";
      this.getTodos();
    });
  }

  deleteTodo(id: string) {
    this.api.delete(`todos/${id}`).subscribe(() => this.getTodos());
  }
}
