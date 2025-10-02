import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tickets } from '../../ticket/entity/tickets.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Tickets, (tickets) => tickets.order, { cascade: true })
  tickets: Tickets[];
}
