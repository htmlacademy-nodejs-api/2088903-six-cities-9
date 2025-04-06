import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Middleware } from './middleware.interface.js';
import { ValidationError } from '../errors/index.js';
import { reduceValidationErrors } from '../../../helpers/index.js';

export class ValidatePathDTOMiddleware implements Middleware {
  constructor(
    private dto: ClassConstructor<object>,
    private paramName: string
  ) {}

  public async execute(
    { params, path }: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const dtoData = { [this.paramName]: params[this.paramName] };
    const dtoInstance = plainToInstance(this.dto, dtoData);
    const errors = await validate(dtoInstance);

    if (errors.length) {
      throw new ValidationError(
        `Validation error: ${path}`,
        reduceValidationErrors(errors)
      );
    }

    next();
  }
}
