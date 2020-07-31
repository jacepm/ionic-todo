import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  API_URL = env.API_URL;

  constructor(private http: HttpClient) {}

  get(uri: string): any {
    return this.http.get(this.API_URL + uri);
  }

  post(uri: string, body: any): any {
    return this.http.post(this.API_URL + uri, body);
  }
}
