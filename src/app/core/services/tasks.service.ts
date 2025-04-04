import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient) {}

  createTask(payload: any): Observable<any> {
    return this.http.post('http://localhost:3000/tasks', payload);
  }
}
