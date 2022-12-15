import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { VenuesModule } from '../venues/venues.module';
import { CategoriesModule } from '../categories/categories.module';
import { DatesModule } from '../dates/dates.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    VenuesModule,
    CategoriesModule,
    DatesModule,
    TypeOrmModule.forFeature([Event]),
  ],
  exports: [
    EventsService,
    TypeOrmModule
  ]
})
export class EventsModule {}
