import { HttpStatusCode } from "@angular/common/http";
import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";

const tasks = [
  { id: 1, name: "Task 1", completed: false },
  { id: 2, name: "Task 2", completed: true },
  { id: 3, name: "Task 3", completed: false },
];

const taskUri = `${environment.apiBaseUrl}${environment.apiPaths.tasks}`;
/**
 * Mock API handlers for task management.
 *
 * @default
 * - GET /api/tasks: Returns a list of tasks.
 * - POST /api/tasks: Creates a new task.
 * - PUT /api/tasks/:id: Updates an existing task.
 * - DELETE /api/tasks/:id: Deletes a task.
 */
export const handlers = [
  http.get(`${taskUri}`, () => {
    return HttpResponse.json(tasks, { status: HttpStatusCode.Ok });
  }),

  http.get(`${taskUri}/:id`, ({ params }) => {
    const { id } = params;
    const task = tasks.find((task) => task.id === Number(id));

    if (!task) {
      return HttpResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return HttpResponse.json(task, { status: HttpStatusCode.Ok });
  }),

  http.post(`${taskUri}`, async ({ request }) => {
    const newTask = (await request.json()) as {
      id: number;
      name: string;
      completed: boolean;
    };

    // Max id
    const maxId = Math.max(...tasks.map((task) => task.id));
    newTask.id = maxId + 1;

    tasks.push(newTask);
    return HttpResponse.json({ message: "", status: HttpStatusCode.Ok });
  }),

  http.put(`${taskUri}/:id`, async ({ request, params }) => {
    const requestBody = (await request.json()) as {
      id: number;
      name: string;
      completed: boolean;
    };

    console.log(`[MSW] Params:`, JSON.stringify(params));
    console.log(`[MSW] Request:`, JSON.stringify(requestBody));

    // id format check
    const taskId = Number(params["id"]);
    if (isNaN(taskId)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request: Invalid ID",
      });
    }

    // find task by id
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return new HttpResponse(
        JSON.stringify({ message: `Task with ID ${taskId} not found` }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // update task
    tasks[taskIndex] = requestBody;

    return HttpResponse.json({ status: HttpStatusCode.Ok });
  }),

  http.delete(`${taskUri}/:id`, ({ params }) => {
    // id format check
    const taskId = Number(params["id"]);
    if (isNaN(taskId)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request: Invalid ID",
      });
    }

    // find task by id
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return new HttpResponse(
        JSON.stringify({ message: `Task with ID ${taskId} not found` }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // delete task
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
    }

    return HttpResponse.json({ status: HttpStatusCode.Ok });
  }),
];
