import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entities/user.entity';
import { ValidRoles } from '../interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    console.log(validRoles);
    if (!validRoles || validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest<unknown>();

    // @ts-expect-error ts(2349)
    const user = req.user as User;

    if (!user) return false;

    for (const role of user.roles) {
      if (validRoles.includes(role as ValidRoles)) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${user.email} need a valid role: [${validRoles.join(' - ')}]`,
    );
  }
}
