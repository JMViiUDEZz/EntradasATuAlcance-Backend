import { Injectable } from '@nestjs/common';
import { CategoriesService } from './../modules/categories/categories.service';
import { DatesService } from './../modules/dates/dates.service';
import { EventsService } from './../modules/events/events.service';
import { ListingsService } from './../modules/listings/listings.service';
import { SalesService } from './../modules/sales/sales.service';
import { AuthService } from './../modules/auth/auth.service';
import { VenuesService } from './../modules/venues/venues.service';
import { categoriesData } from './data/seed-data-categories';
import { datesData } from './data/seed-data-dates';
import { eventsData } from './data/seed-data-events';
import { listingsData } from './data/seed-data-listings';
import { salesData } from './data/seed-data-sales';
import { usersData } from './data/seed-data-users';
import { venuesData } from './data/seed-data-venues';


@Injectable()
export class SeedService {

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly datesService: DatesService,
    private readonly eventsService: EventsService,
    private readonly listingsService: ListingsService,
    private readonly salesService: SalesService,
    private readonly authService: AuthService,
    private readonly venuesService: VenuesService,
  ) {}


  async runSeed() {

    await this.deleteAllDates();
    await this.insertNewCategories();
    await this.insertNewDates();
    await this.insertNewUsers();
    await this.insertNewVenues();
    await this.insertNewEvents();
    await this.insertNewListings();
    await this.insertNewSales();

    return 'SEED EXECUTED';
  }

  private async deleteAllDates() {
    await this.salesService.deleteAllSales();
    await this.listingsService.deleteAllListings();
    await this.eventsService.deleteAllEvents();
    await this.authService.deleteAllUsers();
    await this.categoriesService.deleteAllCategories();
    await this.venuesService.deleteAllVenues();
    await this.datesService.deleteAllDates();
    };

  private async insertNewCategories() {
    const categories = categoriesData.categories; 

    const insertPromises = [];

    categories.forEach( category => {
      insertPromises.push( this.categoriesService.create( category ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

  private async insertNewDates() {
    const dates = datesData.dates;

    const insertPromises = [];

    dates.forEach( date => {
      insertPromises.push( this.datesService.create( date ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

  private async insertNewEvents() {
    const events = eventsData.events;

    const insertPromises = [];

    events.forEach( event => {
      insertPromises.push( this.eventsService.create( event ) );
    });

    await Promise.all( insertPromises );

    return true;
  }
  
  private async insertNewListings() {
    const listings = listingsData.listings;

    const insertPromises = [];

    listings.forEach( listing => {
      insertPromises.push( this.listingsService.create( listing ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

  private async insertNewSales() {
    const sales = salesData.sales;

    const insertPromises = [];

    sales.forEach( sale => {
      insertPromises.push( this.salesService.create( sale ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

  private async insertNewUsers() {
    const users = usersData.users;

    const insertPromises = [];

    users.forEach( user => {
      insertPromises.push( this.authService.create( user ) );
    });

    await Promise.all( insertPromises );

    return true;
  }

  private async insertNewVenues() {
    const venues = venuesData.venues;

    const insertPromises = [];

    venues.forEach( venue => {
      insertPromises.push( this.venuesService.create( venue ) );
    });

    await Promise.all( insertPromises );

    return true;
  }
}