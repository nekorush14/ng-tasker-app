import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../shared/task';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-detail',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatCheckboxModule,
    MatDialogClose,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  readonly dialogRef = inject(MatDialogRef<TaskDetailComponent>);
  readonly data = inject<Task | undefined>(MAT_DIALOG_DATA);
  readonly task = model<Task | undefined>(this.data);
  readonly name = model<String>(this.data?.name || '');
  readonly completed = model<boolean>(this.data?.completed || false);
  readonly options = inject(FormBuilder);

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
