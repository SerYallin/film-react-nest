import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedules } from '../../schedule/entity/schedules.entity';
import { Tickets } from '../../ticket/entity/tickets.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'double precision',
  })
  rating: number;

  @Column()
  director: string;

  @Column({ type: 'text', array: true })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedules, (schedules) => schedules.film)
  schedules: Schedules[];

  @OneToMany(() => Tickets, (tickets) => tickets.film)
  tickets: Tickets[];
}
