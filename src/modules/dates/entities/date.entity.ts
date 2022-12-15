import { Sale } from "../../sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from '../../listings/entities/listing.entity';
import { Event } from '../../events/entities/event.entity';

@Entity({ name: 'dates' })
export class Date {
    @PrimaryGeneratedColumn('uuid')
    dateid: string;

    @Column('text')
    caldate: string;
 
    @Column('text', {
        unique: false,
    })
    day: string;

    @Column('integer')
    week: number;
 
    @Column('text')
    month: string;

    @Column('integer')
    qtr: number;
 
    @Column('integer', {
        default: 2008,
    })
    year: number;

    @Column('boolean', {
        default: null,
        nullable: false
    })
    holiday?: boolean;
    
    @OneToMany(
        () => Sale,
        (Sale) => Sale.date,
        {  onDelete: 'CASCADE' }
        // { cascade: false, eager: false  }
    )
    sale: Sale[];

    @OneToMany(
        () => Listing,
        (Listing) => Listing.date,
        {  onDelete: 'CASCADE' }
        // { cascade: false, eager: false  }
    )
    list: Listing[];

    @OneToMany(
        () => Event,
        (Event) => Event.date,
        {  onDelete: 'CASCADE' }
        // { cascade: false, eager: false  }
    )
    event: Event[];
}