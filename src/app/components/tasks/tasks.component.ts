import { Component, computed, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Task } from '../../models/task';
import { MatButtonModule } from '@angular/material/button';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { MatDialog } from '@angular/material/dialog';

const TASKS: Task[] = [
  { id: 1, name: 'Task 1', completed: false },
  { id: 2, name: 'Task 2', completed: true },
];
@Component({
  selector: 'app-tasks',
  imports: [MatTableModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  tasks = signal<Task[]>([]);
  displayedColumns: string[] = ['id', 'name', 'completed'];
  dataSource: MatTableDataSource<Task> | undefined;
  readonly dialog = inject(MatDialog);
  readonly updatedTask = signal<Task | undefined>(undefined);

  constructor() {
    this.tasks.set(TASKS);

    toObservable(this.tasks).subscribe((tasks) => {
      this.dataSource = new MatTableDataSource(tasks);
    });
  }

  ngOnInit() {}

  onNewTaskClick(): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.update((tasks) => [...tasks, result]);
        this.updatedTask.set(result);
      }
    });
  }

  onTaskTableRowClick(task: Task): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '250px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.update((tasks) =>
          tasks.map((task) => (task.id === result.id ? result : task)),
        );
        this.updatedTask.set(result);
      }
    });
  }
}
