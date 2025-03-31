import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-task-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.css']
})
export class TaskDetailDialogComponent {
  task: any;
  newComment: string = '';

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: any, users: any[] }
  ) {
    this.task = { ...data.task };
    this.task.comments = [...(data.task?.comments || [])];
  }

  saveTask() {
    this.http.patch(`http://localhost:3000/tasks/${this.task.id}`, this.task).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  addComment() {
    const content = this.newComment.trim();
  
    if (content) {
      const payload = { content };
  
      this.http.post(`http://localhost:3000/tasks/${this.task.id}/comments`, payload).subscribe({
        next: (comment: any) => {
          this.task.comments.push(comment); // ou comment se for objeto
          this.newComment = '';
        },
        error: () => {
          // tratamento de erro se quiser
        }
      });
    }
  }

  getStatusButtonText(status: string): string {
    switch (status) {
      case 'Pendente':
        return 'Iniciar tarefa';
      case 'Em progresso':
        return 'Finalizar';
      default:
        return '';
    }
  }
  
  avancarStatus() {
    const novoStatus = this.proximoStatus(this.task.status);
    if (!novoStatus) return;
  
    this.task.status = novoStatus;
  
    this.http.patch(`http://localhost:3000/tasks/${this.task.id}`, {
      status: novoStatus
    }).subscribe(() => {
      // opcional: feedback visual
    });
  }
  
  proximoStatus(status: string): string | null {
    switch (status) {
      case 'Pendente':
        return 'Em progresso';
      case 'Em progresso':
        return 'Finalizado';
      default:
        return null;
    }
  }

  close() {
    this.dialogRef.close();
  }

  getUserEmail(id: string) {
    const user = this.data?.users?.find(u => u.id === id);

    return user?.email;
  }
}
