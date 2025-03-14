// multipart.interceptor.ts
import { Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import * as fastify from 'fastify';
import { MultipartValue } from '@fastify/multipart';
import { MultipartOptions } from '../models/options.model';
import { getFileFromPart } from '../utils/util';
import { validateFile } from '../utils/file.util';

export function MultipartInterceptor(
  options: MultipartOptions = {},
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const req: fastify.FastifyRequest = context.switchToHttp().getRequest();

      if (!req.isMultipart())
        throw new HttpException(
          'The request should be a form-data',
          HttpStatus.BAD_REQUEST,
        );

      const files: { [key: string]: any[] } = {};
      const body = {};

      for await (const part of req.parts()) {
        if (part.type !== 'file') {
          body[part.fieldname] = (part as MultipartValue).value;
          continue;
        }

        const file = await getFileFromPart(part);
        const validationResult = validateFile(file, options);

        if (validationResult)
          throw new HttpException(
            validationResult,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );

        files[part.fieldname] = files[part.fieldname] || [];
        files[part.fieldname].push(file);
      }

      req.storedFiles = files;
      req.body = body;

      return next.handle();
    }
  }

  return mixin(MixinInterceptor);
}
