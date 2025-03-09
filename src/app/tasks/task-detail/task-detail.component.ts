import { Component, inject, model } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { Task } from "../shared/task";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-task-detail",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatCheckboxModule,
  ],
  templateUrl: "./task-detail.component.html",
  styleUrl: "./task-detail.component.scss",
})
export class TaskDetailComponent {
  readonly dialogRef = inject(MatDialogRef<TaskDetailComponent>);
  readonly data = inject<Task | undefined>(MAT_DIALOG_DATA);
  readonly task = model<Task | undefined>(this.data);

  readonly name = model<string>(this.data?.name || "");
  readonly completed = model<boolean>(this.data?.completed || false);
  readonly options = inject(FormBuilder);

  taskFormControl = new FormControl(this.name(), [Validators.required]);

  /**
   * Close the dialog without saving.
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }

  /**
   * Delete the task and close the dialog.
   */
  onDeleteClick(): void {
    this.dialogRef.close({
      id: this.task()?.id,
      name: this.taskFormControl.value,
      completed: this.completed(),
      delete: true,
    });
  }

  /**
   * Return the task data to the caller.
   */
  onSaveClick(): void {
    // Don't save if the name is empty.
    if (
      this.taskFormControl.value === undefined ||
      this.taskFormControl.value === ""
    ) {
      return;
    }
    this.dialogRef.close({
      id: this.task()?.id,
      name: this.taskFormControl.value,
      completed: this.completed(),
    });
  }
}
