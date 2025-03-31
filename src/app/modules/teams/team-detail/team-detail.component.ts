import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../tasks/create-task-dialog/create-task-dialog.component'; // ajuste o caminho se necessário
import { TeamsService } from '../../../core/services/teams.service';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { TasksComponent } from '../../tasks/tasks.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    TasksComponent
  ],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  teamId!: string;
  team: any;

  constructor(
    private route: ActivatedRoute, 
    private dialog: MatDialog,
    private location: Location,
    private teamsService: TeamsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchTeam();
  }

  voltar() {
    this.location.back();
  }

  fetchTeam() {
    this.teamsService.getTeamById(this.teamId).subscribe(data => {
      this.team = data;
    });
  }

  openEditTeamDialog() {
    const dialogRef = this.dialog.open(EditTeamDialogComponent, {
      data: {
        name: this.team.name,
        description: this.team.description
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamsService.updateTeam(this.team.id, result).subscribe({
          next: () => {
            this.toastr.success('Time atualizado!', 'Sucesso', {
              positionClass: 'toast-top-right',
              timeOut: 3000
            });

            this.team.name = result.name;
            this.team.description = result.description;
          },
          error: err => {
            this.toastr.error(err.error?.message || 'Erro ao atualizar o time', 'Erro', {
              positionClass: 'toast-top-right',
              timeOut: 3000
            });
          }
        });
      }
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
