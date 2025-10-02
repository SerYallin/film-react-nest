import {
  Column,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Films } from '../../films/entity/films.entity';
import { Tickets } from '../../ticket/entity/tickets.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column({
    type: 'double precision',
  })
  price: number;

  @Column({ type: 'text', array: true, default: [] })
  taken: string[];

  @ManyToOne(() => Films, (films) => films.id)
  film: Films;

  @OneToMany(() => Tickets, (tickets) => tickets.session)
  tickets: Tickets[];
}
