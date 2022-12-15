import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { ListingsModule } from '../listings/listings.module';
import { AuthModule } from '../auth/auth.module';
import { EventsModule } from '../events/events.module';
import { DatesModule } from '../dates/dates.module';
import { Listing } from '../listings/entities/listing.entity';
import { Event } from '../events/entities/event.entity';


@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [
    ListingsModule,
    AuthModule,
    EventsModule,
    DatesModule,
    TypeOrmModule.forFeature([Sale, Listing, Event])    
  ],
  exports: [
    SalesService,
    TypeOrmModule
  ]
})
export class SalesModule {}
