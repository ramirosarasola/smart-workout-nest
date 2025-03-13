import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine, RoutineImage } from './entities';
import { RoutinesController } from './routines.controller';
import { RoutinesService } from './routines.service';

@Module({
  controllers: [RoutinesController],
  providers: [RoutinesService],
  imports: [TypeOrmModule.forFeature([Routine, RoutineImage])],
})
export class RoutinesModule {}
