import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CategoriesModule],
})
export class SeedModule {}
