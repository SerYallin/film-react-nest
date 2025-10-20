import { Injectable } from '@nestjs/common';
import { GetFilmDto, GetFilmsDto } from '../films/dto/films.dto';
import {
  GetScheduleDto,
  GetScheduleItemDto,
} from '../schedule/dto/schedule.dto';
import { CreateTicketDto } from '../ticket/dto/ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from '../films/entity/films.entity';
import { Raw, Repository } from 'typeorm';
import { Schedules } from '../schedule/entity/schedules.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Films)
    private films: Repository<Films>,
    @InjectRepository(Schedules)
    private schedules: Repository<Schedules>,
  ) {}
  private getFilmMapperFn(): (Film) => GetFilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating || 0,
        director: root.director || '',
        tags: root.tags || '',
        title: root.title || '',
        about: root.about || '',
        description: root.description || '',
        image: root.image || '',
        cover: root.cover || '',
      };
    };
  }

  private getScheduleMapFn(): (Film) => GetScheduleItemDto {
    return (root) => {
      return {
        id: root.id,
        daytime: root.daytime || '',
        hall: root.hall || 0,
        rows: root.rows || 0,
        seats: root.seats || 0,
        price: root.price || 0,
        taken: root.taken || '',
      };
    };
  }
  async getFilms(): Promise<GetFilmsDto> {
    const items = await this.films.find();
    const total = await this.films.count();
    return {
      page: 0,
      size: 50,
      total,
      items: items.map(this.getFilmMapperFn()),
    };
  }

  async getFilmSchedule(id: string): Promise<GetScheduleDto> {
    const items = await this.schedules.find({ where: { film: { id } } });
    return { items: items.map(this.getScheduleMapFn()) };
  }

  async getSheduleToken(ticket: CreateTicketDto): Promise<boolean> {
    const taken = ticket.row + ':' + ticket.seat;
    const data = await this.schedules.find({
      where: {
        id: ticket.session,
        film: { id: ticket.film },
        daytime: ticket.daytime,
        taken: Raw((alias) => `${alias} && :taken::text[]`, { taken: [taken] }),
      },
    });
    return !!data.length;
  }

  async updateSheduleToken(ticket: CreateTicketDto) {
    const taken = ticket.row + ':' + ticket.seat;
    const criteria = {
      id: ticket.session,
      film: { id: ticket.film },
      daytime: ticket.daytime,
    };
    const session = await this.schedules.findOne({
      where: criteria,
    });
    session.taken.push(taken);
    await this.schedules.update(criteria, {
      taken: session.taken,
    });
  }
}
