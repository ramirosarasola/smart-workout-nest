import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.log(data);

    const headers = req.headers;

    if (!headers)
      throw new InternalServerErrorException(`Headers not found (request).`);

    if (!data) return headers;
  },
);
