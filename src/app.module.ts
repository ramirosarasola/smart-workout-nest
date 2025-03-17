import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { ExerciseMuscleModule } from './exercise-muscle/exercise-muscle.module';
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { RoutinesModule } from './routines/routines.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // -> En production no derberiamos tenerlo en TRUE - Usar migraciones
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    CategoriesModule,
    SeedModule,
    RoutinesModule,
    CommonModule,
    ExercisesModule,
    MusclesModule,
    ExerciseMuscleModule,
    FilesModule,
    AuthModule,
    WorkoutsModule,
  ],
})
export class AppModule {}
