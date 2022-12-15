import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';

@Module({
  controllers: [VenuesController],
  providers: [VenuesService],
  imports: [
    TypeOrmModule.forFeature([Venue])
  ],
  exports: [
    VenuesService,
    TypeOrmModule
  ]
})
export class VenuesModule {}
