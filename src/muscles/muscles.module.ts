import { Module } from '@nestjs/common';
import { MusclesController } from './muscles.controller';
import { Muscle } from './entities/muscle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusclesService } from './muscles.service';

@Module({
  controllers: [MusclesController],
  providers: [MusclesService],
  imports: [TypeOrmModule.forFeature([Muscle])],
  exports: [MusclesService],
})
export class MusclesModule {}
