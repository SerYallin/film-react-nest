import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schedules } from '../../schedule/entity/schedules.entity';
import { Films } from '../../films/entity/films.entity';
import { Orders } from '../../order/entity/orders.entity';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  row: number;

  @Column()
  seat: number;

  @Column({
    type: 'double precision',
  })
  price: number;

  @ManyToOne(() => Schedules, (schedules) => schedules.id)
  session: Schedules;

  @ManyToOne(() => Films, (films) => films.id)
  film: Films;

  @ManyToOne(() => Orders, (order) => order.tickets)
  order: Orders;
}
