import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TeamsService } from '../../../core/services/teams.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-team-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.css']
})
export class CreateTeamDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateTeamDialogComponent>,
    private teamsService: TeamsService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: '',
      description: ''
    });
  }

  create() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
