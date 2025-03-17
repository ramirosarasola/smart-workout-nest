import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User | string | undefined => {
    const req = ctx.switchToHttp().getRequest<{ user?: User }>();
    console.log(data);

    const user: User | undefined = req?.user;

    if (!user)
      throw new InternalServerErrorException(`User not found (request).`);

    if (!data) {
      return user;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user[data];
  },
);
