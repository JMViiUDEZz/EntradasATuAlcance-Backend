import { Module } from '@nestjs/common';

import { CategoriesModule } from './../modules/categories/categories.module';
import { DatesModule } from './../modules/dates/dates.module';
import { EventsModule } from './../modules/events/events.module';
import { ListingsModule } from './../modules/listings/listings.module';
import { SalesModule } from './../modules/sales/sales.module';
import { VenuesModule } from './../modules/venues/venues.module';
import { AuthModule } from './../modules/auth/auth.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    CategoriesModule,
    DatesModule,
    EventsModule,
    ListingsModule,
    SalesModule,
    AuthModule,
    VenuesModule
  ]
})
export class SeedModule {}