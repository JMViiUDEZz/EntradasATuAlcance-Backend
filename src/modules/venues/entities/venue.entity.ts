import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from '../../events/entities/event.entity';

@Entity({ name: 'venues' })
export class Venue {
    @PrimaryGeneratedColumn('uuid')
    venueid: string;

    @Column('text',{
        unique: false,
    })
    venuename: string;   

    @Column('text')
    venuecity: string;   

    @Column('text')
    venuestate: string;   

    @Column('integer',{
        default: 0
    })
    venueseats?: number;   

    @OneToMany(
        () => Event,
        (Event) => Event.venue,
        {  onDelete: 'CASCADE' }
        // { cascade: false, eager: false  }
    )
    event: Event[];
}