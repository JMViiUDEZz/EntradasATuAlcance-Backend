import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from '../../listings/entities/listing.entity';
import { Event } from '../../events/entities/event.entity';
import { Date } from "../../dates/entities/date.entity";
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'sales' })
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    saleid: string;

    @OneToMany(
        () => Listing,
        (Listing) => Listing.sale,
        { cascade: true, eager: true  }
        // { cascade: true, eager: true  }
    )
    list?: Listing[];

    @ManyToOne(
        () => User,
        (User) => User.sale,
        { cascade: true, eager: true  }
        // { cascade: true, eager: true  }
    )
    seller: User;
  
    @ManyToOne(
        () => User,
        (User) => User.sale,
        { cascade: true, eager: true  }
        // { cascade: true, eager: true  }
    )
    buyer: User;
     
    @ManyToMany(
        () => Event,
        (Event) => Event.sale,
        { cascade: true, eager: true  }
        // { cascade: true, eager: true  }
    )
    @JoinTable()
    event?: Event[];

    @ManyToOne(
        () => Date,
        (Date) => Date.sale,
        { cascade: true, eager: true  }
        // { cascade: true, eager: true  }
    )
    date: Date;
    
    @Column('integer',{ //int
        default: 0
    })
    qtysold: number;   

    @Column('integer',{ //int
        default: 0
    })
    pricepaid: number;   

    @Column('integer',{ //int
        default: 0
    })
    commission: number;   

    @Column('text')
    saletime: string;   
}