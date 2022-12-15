import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../auth/entities/user.entity';
import { Date } from '../../dates/entities/date.entity';
import { Event } from '../../events/entities/event.entity';
import { Sale } from "../../sales/entities/sale.entity";

@Entity({ name: 'listings' })
export class Listing {
    @PrimaryGeneratedColumn('uuid')
    listid: string;

    @ManyToOne(
        () => User,
        (User) => User.list,
        { cascade: true, eager: true  }
        // { cascade: true, eager: true  }
    )
    seller: User;
     
    @OneToOne(
        () => Event,
        (Event) => Event.list,
        { cascade: true, eager: true  }
        // { cascade: true, eager: true  }
    )
    @JoinColumn()
    event: Event;

    @ManyToOne(
        () => Date,
        (Date) => Date.list,
        { cascade: true, eager: true  }
        // { cascade: true, eager: true  }
    )
    date: Date;
    
    @Column('integer',{ //int
        default: 0
    })
    numtickets: number;   

    @Column('integer',{ //int
        default: 0
    })
    priceperticket: number;   

    @Column('integer',{ //int
        default: 0
    })
    totalprice: number;   

    @Column('text')
    listtime: string;

    @ManyToOne(
        () => Sale,
        (Sale) => Sale.list,
        {  onDelete: 'CASCADE' } 
        // { cascade: true, eager: true  }
    )
    sale: Sale;
}