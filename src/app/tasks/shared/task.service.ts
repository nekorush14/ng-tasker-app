import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Task service interface.
 * This interface provides CRUD operations for `Task` objects.
 * @interface ITaskService
 * @method getTasks - Retrieves all tasks.
 * @method getTask - Retrieves a task by its ID.
 * @method addTask - Adds a new task.
 * @method updateTask - Updates an existing task.
 * @method deleteTask - Deletes a task by its ID.
 */
export interface ITaskService {
  /**
   * Retrieves all tasks.
   * @returns An array of `Task` objects.
   */
  getTasks(): Observable<Task[]>;

  /**
   * Retrieves a task by its ID.
   * @param id - The ID of the task to retrieve.
   * @returns The `Task` object if found, otherwise `undefined`.
   */
  getTask(id: number): Observable<Task>;

  /**
   * Adds a new task.
   * @param task - The `Task` object to add.
   * @returns registration response with status code.
   */
  addTask(task: Task): Observable<any>;

  /**
   * Updates an existing task.
   * @param task - The `Task` object to update.
   * @returns update response with status code.
   */
  updateTask(task: Task): Observable<any>;

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to delete.
   * @returns delete response with status code.
   */
  deleteTask(id: number): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService implements ITaskService {
  private client: HttpClient;

  constructor(private http: HttpClient) {
    this.client = http;
  }

  getTasks(): Observable<Task[]> {
    return this.client.get<Task[]>('/api/tasks', {});
  }

  getTask(id: number): Observable<Task> {
    return this.client.get<Task>(`/api/tasks/${id}`, {});
  }

  addTask(task: Task): Observable<any> {
    return this.client.post('/api/tasks', task, {});
  }

  updateTask(task: Task): Observable<any> {
    return this.client.put(`/api/tasks/${task.id}`, task, {});
  }

  deleteTask(id: number): Observable<any> {
    return this.client.delete(`/api/tasks/${id}`, {});
  }
}
