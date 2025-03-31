import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsService } from './core/services/notifications.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'team-task-manager-frontend';

  constructor(
    private notificationsService: NotificationsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.notificationsService.listenTaskStatusChange().subscribe(({task, oldStatus}) => {
      this.toastr.info(
        `Tarefa "${task.title}" mudou de "${oldStatus}" para "${task.status}"`,
        'Status atualizado'
      );
    });
  }
}
