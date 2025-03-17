import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<{ user?: User }>();

  const user: User | undefined = req?.user;

  console.log({ user });

  if (!user)
    throw new InternalServerErrorException(`User not found (request).`);

  return user;
});
