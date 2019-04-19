import { ErrorCode } from '../shared/error-codes';

import { ApiResponse, ErrorResponseBody, Response } from './common.interface';
import {
    BadRequestResult,
    ConfigurationErrorResult,
    ErrorResult,
    GeneralErrorResult,
    InternalServerErrorResult,
    NotFoundResult
} from './errors';
import { HttpStatusCode } from './http-status-codes';

export class ResponseBuilder {
    public static badRequest(code: string, description: string, res: Response): void {
        const errorResult: BadRequestResult = new BadRequestResult(code, description);
        ResponseBuilder._returnAs(errorResult, HttpStatusCode.BadRequest, res);
    }

    public static configurationError(code: string, description: string, res: Response): void {
        const errorResult: ConfigurationErrorResult = new ConfigurationErrorResult(code, description);
        ResponseBuilder._returnAs(errorResult, HttpStatusCode.ConfigurationError, res);
    }

    public static generalError(error: Error, res: Response): void {
        const errorResult: GeneralErrorResult = new GeneralErrorResult(ErrorCode.GeneralError, error.message);
        ResponseBuilder._returnAs(errorResult, HttpStatusCode.GeneralError, res);
    }

    public static internalServerError(code: string, description: string, res: Response): void {
        const errorResult: InternalServerErrorResult = new InternalServerErrorResult(code, description);
        ResponseBuilder._returnAs(errorResult, HttpStatusCode.InternalServerError, res);
    }

    public static notFound(code: string, description: string, res: Response): void {
        const errorResult: NotFoundResult = new NotFoundResult(code, description);
        ResponseBuilder._returnAs(errorResult, HttpStatusCode.NotFound, res);
    }

    public static ok<T>(result: T, res: Response): void {
        ResponseBuilder._returnAs(result, HttpStatusCode.Ok, res);
    }

    private static _returnAs<T>(result: T, statusCode: number, res: Response): void {
        const bodyObject: ErrorResponseBody | ApiResponse<T> = result instanceof ErrorResult
            ? { error: result }
            : { status: statusCode, data: result };

        res.status(statusCode).send(bodyObject);
    }
}
