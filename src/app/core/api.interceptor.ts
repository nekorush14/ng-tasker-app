import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/environment";

/**
 * Intercepts HTTP requests and adds an API key to the headers.
 * @param req HTTP request
 * @param next HTTP next handler
 * @returns The next handler's response
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.url.startsWith("http")
    ? req.clone({
        setHeaders: {
          "X-API-KEY": environment.apiKey,
        },
      })
    : req.clone({
        url: `${environment.apiBaseUrl}${req.url}`,
        setHeaders: {
          "X-API-KEY": environment.apiKey,
        },
      });

  return next(apiReq);
};
