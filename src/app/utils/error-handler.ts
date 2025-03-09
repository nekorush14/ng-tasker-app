import { HttpStatusCode } from "@angular/common/http";
import { Router } from "@angular/router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(err: any, router: Router): void {
  console.error("[ERROR]", err);

  const statusCode = err.status || HttpStatusCode.InternalServerError;
  const message = err.error?.message || "Internal server error";

  // Navigate to error page.
  router.navigate(["/error"], {
    state: {
      statusCode,
      message,
    },
  });
}
