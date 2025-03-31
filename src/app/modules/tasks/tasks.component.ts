import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { TaskDetailDialogComponent } from './task-detail-dialog/task-detail-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../core/services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() teamId!: string;
  @Input() users: any[] = [];
  tasks: any[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private tasksService: TasksService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.teamId) {
      this.fetchTasks();
    }
  }

  fetchTasks() {
    this.http.get<any[]>(`http://localhost:3000/teams/${this.teamId}/tasks`)
      .subscribe(data => {
        this.tasks = data;
      });
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {
        teamId: this.teamId,
        users: this.users
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksService.createTask(result).subscribe({
          next: () => {
            this.toastr.success('Tarefa criada!', 'Sucesso', {
              positionClass: 'toast-top-right',
              timeOut: 3000
            });

            this.fetchTasks()
          },
          error: err => {
            this.toastr.error(err.error?.message || 'Erro ao criar a tarefa', 'Erro', {
              positionClass: 'toast-top-right',
              timeOut: 3000
            });
          }
        });
      }
    });
  }

  openTaskDetail(task: any) {
    const dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      data: {
        task,
        users: this.users
      }
    });

    dialogRef.afterClosed().subscribe(updated => {
      if (updated) {
        Object.assign(task, updated);
      }
    });
  }
}
