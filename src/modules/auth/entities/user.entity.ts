import { Sale } from "../../sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from '../../listings/entities/listing.entity';

@Entity({ name: 'users' })
export class User {
    map(arg0: (img: any) => any): any {
      throw new Error('Method not implemented.');
    } 
    @PrimaryGeneratedColumn('uuid') 
    userid: string;
  
    @Column('text',{
        default:[null]
    })
    username?: string;
  
    @Column('text',{
        default:[null]
    })    
    firstname?: string;
    
    @Column('text',{
        default:[null]
    })    
    lastname?: string;

    @Column('text')
    fullname:string;

    @Column('text',{
        default:[null]
    })    
    city?: string;

    @Column('text',{
        default:[null]
    })    
    state?: string;

    @Column('text', {
        unique: true
    })    
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text',{
        default:[null]
    })    
    phone?: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        default: ['user']
    })
    role: string;

    @Column('boolean',{
        default:false
    })
    likesports?: boolean;

    @Column('boolean',{
        default:false
    })
    liketheatre?: boolean;
     
    @Column('boolean',{
        default:false
    })
    likeconcerts?: boolean;

    @Column('boolean',{
        default:false
    })
    likejazz?: boolean;

    @Column('boolean',{
        default:false
    })
    likeclassical?: boolean;

    @Column('boolean',{
        default:false
    })
    likeopera?: boolean;

    @Column('boolean',{
        default:false
    })
    likerock?: boolean;
    
    @Column('boolean',{
        default:false
    })
    likevegas?: boolean;

    @Column('boolean',{
        default:false
    })
    likebroadway?: boolean;

    @Column('boolean',{
        default:false
    })
    likemusicals?: boolean;

    @OneToMany(
        () => Sale,
        (Sale) => Sale.seller,
        {  onDelete: 'CASCADE' }
    )
    @OneToMany(
        () => Sale,
        (Sale) => Sale.buyer,
        {  onDelete: 'CASCADE' }
    )
    sale?: Sale[];

    @OneToMany(
        () => Listing,
        (Listing) => Listing.seller,
        {  onDelete: 'CASCADE' }
    )
    list?: Listing[];
}
