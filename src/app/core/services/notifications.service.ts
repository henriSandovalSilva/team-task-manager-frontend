import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private socket = io('http://localhost:3000');

  listenTaskStatusChange(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('taskStatusChanged', (data: any) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
