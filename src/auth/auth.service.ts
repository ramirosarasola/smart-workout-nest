import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
// import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user: User = this.userRepository.create({
        ...userData,
        // password: bcrypt.hashSync(password, 10),
        password: password,
      });

      this.logger.log(`User ${user.name} created successfully!`);
      await this.userRepository.save(user);

      return {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      // this.logger.error(error);
      this.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user: User | null = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user)
      throw new UnauthorizedException(`Credentials are not valid (email)`);

    // if (!bcrypt.compareSync(password, user.password))
    if (!password)
      throw new UnauthorizedException(`Credentials are not valid (password)`);

    return {
      email: user.email,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  validateToken(user: User) {
    return {
      email: user.email,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload); // Return the token
  }

  private handleDBExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(error.detail);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected Error. Check Server Logs!',
    );
  }
}
