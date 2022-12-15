import { Venue } from "../../venues/entities/venue.entity";
import { Category } from '../../categories/entities/category.entity';
import { Date } from '../../dates/entities/date.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "../../sales/entities/sale.entity";
import { Listing } from '../../listings/entities/listing.entity';

@Entity({ name: 'events' })
export class Event {
    @PrimaryGeneratedColumn('uuid')
    eventid: string;

    @ManyToOne(
        () => Venue,
        (Venue) => Venue.event,
        { cascade: true, eager: true  }
    )
    venue: Venue;
     
    @ManyToOne(
        () => Category,
        (Category) => Category.event,
        { cascade: true, eager: true  }
    )
    cat: Category;

    @ManyToOne(
        () => Date,
        (Date) => Date.event,
        { cascade: true, eager: true  }
    )
    date: Date;

    @Column('text')
    eventname: string;   

    @Column('text')
    starttime: string;
    
    @ManyToMany(
        () => Sale,
        (Sale) => Sale.event,
        {  onDelete: 'CASCADE' }   
    )
    sale: Sale[];  

    @OneToOne(
        () => Listing,
        (Listing) => Listing.event,
        {  onDelete: 'CASCADE' }
    )
    list: Listing;
}