import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutinesService } from './routines.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  @Auth()
  create(@GetUser() user: User, @Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.routinesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.routinesService.findOnePlain(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoutineDto: UpdateRoutineDto,
  ) {
    return this.routinesService.update(id, updateRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.routinesService.delete(id);
  }
}
