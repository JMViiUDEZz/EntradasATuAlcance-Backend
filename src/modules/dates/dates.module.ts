import { Module } from '@nestjs/common';
import { DatesService } from './dates.service';
import { DatesController } from './dates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Date } from './entities/date.entity';

@Module({
  controllers: [DatesController],
  providers: [DatesService],
  imports: [
    TypeOrmModule.forFeature([Date])
  ],
  exports: [
    DatesService,
    TypeOrmModule
  ],
})
export class DatesModule {}
