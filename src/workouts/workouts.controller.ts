import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  //  This method is only used to start a new workout routine for the first time.
  @Post()
  @Auth(ValidRoles.user)
  startWorkout(@GetUser() user: User) {
    return this.workoutsService.create(user);
  }

  //  This method is only used to save a new workout..
  @Patch()
  @Auth(ValidRoles.user)
  saveWorkout(@GetUser() user: User, @Body() saveWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.saveWorkout(user, saveWorkoutDto);
  }

  @Get('user/all/:userId')
  @Auth(ValidRoles.user)
  findAllByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.workoutsService.findAllActiveByUserId(userId);
  }

  @Get('user/:workoutId')
  @Auth(ValidRoles.user)
  findOne(@Param('workoutId') workoutId: string, @GetUser() user: User) {
    return this.workoutsService.findOneActiveByUserId(user, workoutId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id);
  }
}
