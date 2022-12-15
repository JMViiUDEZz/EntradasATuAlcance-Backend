import { Sale } from "../../sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from '../../listings/entities/listing.entity';

@Entity({ name: 'users' })
export class User { 
    @PrimaryGeneratedColumn('uuid') 
    userid: string;
  
    @Column('text')
    username: string;
  
    @Column('text')
    firstname: string;
    
    @Column('text')
    lastname: string;

    @Column('text')
    fullname:string;

    @Column('text')
    city: string;

    @Column('text')
    state: string;

    @Column('text', {
        unique: true
    })    
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    phone: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @Column('boolean')
    likesports: boolean;

    @Column('boolean')
    liketheatre: boolean;
     
    @Column('boolean')
    likeconcerts: boolean;

    @Column('boolean')
    likejazz: boolean;

    @Column('boolean')
    likeclassical: boolean;

    @Column('boolean')
    likeopera: boolean;

    @Column('boolean')
    likerock: boolean;
    
    @Column('boolean')
    likevegas: boolean;

    @Column('boolean')
    likebroadway: boolean;

    @Column('boolean')
    likemusicals: boolean;

    @OneToMany(
        () => Sale,
        (Sale) => Sale.seller,
        {  onDelete: 'CASCADE' }
        // { cascade: false, eager: false  }
    )
    @OneToMany(
        () => Sale,
        (Sale) => Sale.buyer,
        {  onDelete: 'CASCADE' }
        // { cascade: false, eager: false  }
    )
    sale: Sale[];

    @OneToMany(
        () => Listing,
        (Listing) => Listing.seller,
        {  onDelete: 'CASCADE' }
        // { cascade: false, eager: false  }
    )
    list: Listing[];
}
