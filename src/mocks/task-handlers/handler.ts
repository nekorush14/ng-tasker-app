import { http, HttpResponse } from 'msw';

/**
 * Mock API handlers for task management.
 *
 * @default
 * - GET /api/tasks: Returns a list of tasks.
 */
export const handlers = [
  http.get('/api/tasks', () => {
    const tasks = [
      { id: 1, name: 'Task 1', completed: false },
      { id: 2, name: 'Task 2', completed: true },
    ];
    return HttpResponse.json(tasks);
  }),
];
