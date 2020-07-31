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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.api.get(`todos`).subscribe((todos: ITodos[]) => (this.todos = todos));
  }
}
