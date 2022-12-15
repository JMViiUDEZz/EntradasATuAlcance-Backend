import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
// import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { DatesModule } from '../dates/dates.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService],
  imports: [
    // UsersModule,
    AuthModule,
    EventsModule,
    DatesModule,
    TypeOrmModule.forFeature([Listing]),
  ],
  exports: [
    ListingsService, TypeOrmModule
  ]
})
export class ListingsModule {}
