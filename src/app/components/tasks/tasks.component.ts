import { Component, computed, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Task } from '../../models/task';
import { MatButtonModule } from '@angular/material/button';

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

  constructor() {
    this.tasks.set([
      { id: 1, name: 'Task 1', completed: false },
      { id: 2, name: 'Task 2', completed: true },
    ]);

    toObservable(this.tasks).subscribe((tasks) => {
      this.dataSource = new MatTableDataSource(tasks);
    });
  }

  ngOnInit() {}
}
