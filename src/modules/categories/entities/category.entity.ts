import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from '../../events/entities/event.entity';

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn('uuid')
    catid: string;

    @Column('text')
    catgroup: string;
 
    @Column('text', {
        unique: false,
    })
    catname: string;

    @Column('text', {
        default: null,
        nullable: false
    })
    catdesc?: string;   

    @OneToMany(
        () => Event,
        (Event) => Event.cat,
        {  onDelete: 'CASCADE' }
        // { cascade: false, eager: false  }
    )
    event: Event[];
}