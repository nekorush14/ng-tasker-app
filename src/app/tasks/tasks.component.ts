import { Component, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toObservable } from '@angular/core/rxjs-interop';
import { Task } from './shared/task';
import { MatButtonModule } from '@angular/material/button';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
} from '@angular/material/dialog';
import { TaskService } from './shared/task.service';
import { handleError } from '../utils/error-handler';

@Component({
  selector: 'app-tasks',
  imports: [
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { autoFocus: 'dialog', restoreFocus: true },
    },
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  readonly tasks = signal<Task[]>([]);
  readonly displayedColumns = ['id', 'name', 'completed'];
  readonly dialog = inject(MatDialog);
  dataSource: MatTableDataSource<Task> | undefined;

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {
    toObservable(this.tasks).subscribe((tasks) => {
      this.dataSource = new MatTableDataSource(tasks);
    });
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  /**
   * Handle the click event on a row in the task table.
   * @param task Task to be updated on clicked row.
   */
  onTaskTableRowClick(task: Task): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      data: task,
    });

    // Update the task in the list if the dialog result has task data.
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
      if (result !== undefined) {
        if (result.delete) {
          // Call the task service to delete a task and if it has error then redirect to error page.
          this.taskService.deleteTask(result.id).subscribe({
            next: () => {
              // Refresh the current tasks.
              this.taskService.getTasks().subscribe((tasks) => {
                this.tasks.set(tasks);
              });
            },
            error: (err) => handleError(err, this.router),
          });
        } else {
          // Call the task service to update a task and if it has error then redirect to error page.
          this.taskService
            .updateTask({
              id: result.id,
              name: result.name,
              completed: result.completed,
            })
            .subscribe({
              next: () => {
                // Refresh the current tasks.
                this.taskService.getTasks().subscribe((tasks) => {
                  this.tasks.set(tasks);
                });
              },
              error: (err) => handleError(err, this.router),
            });
        }
      }
    });
  }

  /**
   * Add a new task using dialog.
   */
  onNewTaskClick(): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      data: {},
    });

    // Add a new task to the list if the dialog result has task data.
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
      if (result !== undefined) {
        // Call the task service to add a new task and if it has error then redirect to error page.
        this.taskService.addTask(result).subscribe({
          next: () => {
            // Refresh the current tasks.
            this.taskService.getTasks().subscribe((tasks) => {
              this.tasks.set(tasks);
            });
          },
          error: (err) => handleError(err, this.router),
        });
      }
    });
  }
}
