import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];
  editingId: string | null = null;
  editedName: string = '';

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams() {
    this.http.get<any[]>('http://localhost:3000/teams').subscribe(data => {
      this.teams = data;
    });
  }

  edit(team: any) {
    this.editingId = team.id;
    this.editedName = team.name;
  }

  save(team: any) {
    this.http.patch(`http://localhost:3000/teams/${team.id}`, {
      name: this.editedName
    }).subscribe(() => {
      team.name = this.editedName;
      this.editingId = null;
    });
  }

  goToTeam(teamId: string) {
    this.router.navigate(['/teams', teamId]);
  }

  newTeam = {
    name: '',
    description: ''
  };
  
  createTeam() {
    this.http.post('http://localhost:3000/teams', this.newTeam).subscribe(() => {
      this.newTeam = { name: '', description: '' };
      this.fetchTeams();
    });
  }

  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(CreateTeamDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTeams();
      }
    });
  }
}
