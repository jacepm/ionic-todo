import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
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

  constructor(private api: ApiService, public toastController: ToastController) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.api.get(`todos`).subscribe((todos: ITodos[]) => (this.todos = todos));
  }

  addTodo() {
    this.api.post(`todos`, { title: this.todo.title, completed: false }).subscribe(() => {
      this.presentToast(`${this.todo.title.toUpperCase()} is sucessfully added.`);
      this.todo = { _id: "", title: "", completed: false };
      return this.getTodos();
    });
  }

  updateTodo() {
    const todo = { ...this.todo };
    this.api.patch(`todos/${this.todo._id}`, todo).subscribe(() => {
      this.presentToast(`${todo.title.toUpperCase()} is sucessfully updated.`);
      this.todo = { _id: "", title: "", completed: false };
      return this.getTodos();
    });
  }

  deleteTodo(id: string) {
    this.api.delete(`todos/${id}`).subscribe((todo: ITodos) => {
      this.presentToast(`${todo.title.toUpperCase()} is sucessfully deleted.`);
      return this.getTodos();
    });
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
