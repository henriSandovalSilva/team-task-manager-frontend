import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamsService } from '../../core/services/teams.service';
import { ToastrService } from 'ngx-toastr';

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
    MatListModule,
    MatTooltipModule
  ],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private teamsService: TeamsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams() {
    this.teamsService.getAllTeams().subscribe(data => {
      this.teams = data;
    });
  }

  goToTeam(teamId: string) {
    this.router.navigate(['/teams', teamId]);
  }

  toggleMembership(event: Event, team: any): void {
    event.stopPropagation();

    if (team.isMember) {
      this.teamsService.leaveTeam(team.id).subscribe({
        next: () => {
          team.isMember = false;
          this.toastr.info('Você saiu do time.', 'Ok', {
            positionClass: 'toast-top-right',
            timeOut: 3000
          });
        },
        error: err => {
          this.toastr.error(err.error?.message || 'Erro ao sair do time', 'Erro', {
            positionClass: 'toast-top-right',
            timeOut: 3000
          });
        }
      });
    } else {
      this.teamsService.joinTeam(team.id).subscribe({
        next: () => {
          team.isMember = true;
          this.toastr.success('Você agora é membro do time!', 'Sucesso', {
            positionClass: 'toast-top-right',
            timeOut: 3000
          });
        },
        error: err => {
          this.toastr.error(err.error?.message || 'Erro ao entrar no time', 'Erro', {
            positionClass: 'toast-top-right',
            timeOut: 3000
          });
        }
      });
    }
  }

  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(CreateTeamDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamsService.createTeam(result).subscribe({
          next: () => {
            this.toastr.success('Time criado!', 'Sucesso', {
              positionClass: 'toast-top-right',
              timeOut: 3000
            });

            this.fetchTeams()
          },
          error: err => {
            this.toastr.error(err.error?.message || 'Erro ao criar o time', 'Erro', {
              positionClass: 'toast-top-right',
              timeOut: 3000
            });
          }
        });
    }});
  }
}
