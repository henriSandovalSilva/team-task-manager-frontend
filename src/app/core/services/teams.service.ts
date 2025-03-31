import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  constructor(private http: HttpClient) {}

  getTeamById(teamId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/teams/${teamId}`);
  }

  getAllTeams(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/teams');
  }

  createTeam(teamData: { name: string; description: string }): Observable<any> {
    return this.http.post('http://localhost:3000/teams', teamData);
  }

  joinTeam(teamId: string): Observable<any> {
    return this.http.post(`http://localhost:3000/teams/${teamId}/join`, {});
  }

  leaveTeam(teamId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/teams/${teamId}/leave`, {});
  }
  
  updateTeam(teamId: string, data: { name: string; description: string }): Observable<any> {
    return this.http.patch(`http://localhost:3000/teams/${teamId}`, data);
  }
}
