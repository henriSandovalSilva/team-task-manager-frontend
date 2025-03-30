import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../tasks/create-task-dialog/create-task-dialog.component'; // ajuste o caminho se necessário

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  teamId!: string;
  team: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchTeam();
  }

  fetchTeam() {
    this.http.get<any>(`http://localhost:3000/teams/${this.teamId}`).subscribe(data => {
      this.team = data;
    });
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {
        teamId: this.teamId,
        users: this.team.users
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchTeam();
      }
    });
  }
  
}
