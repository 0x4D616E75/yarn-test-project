import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

/**
 * Normalises HttpExceptions originating from different @nestjs/common instances.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse();

    const maybeHttpException = exception as {
      getStatus?: () => number;
      getResponse?: () => unknown;
      message?: string;
    } | null;

    if (maybeHttpException?.getStatus) {
      const status = maybeHttpException.getStatus();
      const body = maybeHttpException.getResponse
        ? maybeHttpException.getResponse()
        : {
            statusCode: status,
            message: maybeHttpException.message ?? 'Error',
          };

      if (typeof response.status === 'function') {
        response.status(status);
      }
      if (typeof response.json === 'function') {
        response.json(body);
      } else if (typeof response.send === 'function') {
        response.send(body);
      } else {
        // Fallback for adapters that expose reply
        response.statusCode = status;
        response.end(JSON.stringify(body));
      }
      return;
    }

    const fallbackStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const fallbackBody = {
      statusCode: fallbackStatus,
      message: 'Internal server error',
    };

    if (typeof response.status === 'function') {
      response.status(fallbackStatus);
    } else {
      response.statusCode = fallbackStatus;
    }

    if (typeof response.json === 'function') {
      response.json(fallbackBody);
    } else if (typeof response.send === 'function') {
      response.send(fallbackBody);
    } else {
      response.end(JSON.stringify(fallbackBody));
    }
  }
}
