import { Inject, Injectable } from '@nestjs/common';
import { GetFilmDto, GetFilmsDto } from '../films/dto/films.dto';
import Film from '../films/shema/film.schema';
import { Connection } from 'mongoose';
import {
  GetScheduleDto,
  GetScheduleItemDto,
} from '../schedule/dto/schedule.dto';
import { CreateTicketDto } from '../ticket/dto/ticket.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private connection: typeof Connection,
  ) {}
  private getFilmMapperFn(): (Film) => GetFilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating || 0,
        director: root.director || '',
        tags: root.tags || [],
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
        taken: root.taken || [],
      };
    };
  }
  async getFilms(): Promise<GetFilmsDto> {
    const items = await Film.find();
    const total = await Film.countDocuments({});
    return {
      page: 0,
      size: 50,
      total,
      items: items.map(this.getFilmMapperFn()),
    };
  }

  async getFilmSchedule(id: string): Promise<GetScheduleDto> {
    const item = await Film.findOne({ id }, 'schedule');
    return { items: item?.schedule.map(this.getScheduleMapFn()) };
  }

  async getSheduleToken(ticket: CreateTicketDto): Promise<boolean> {
    const taken = ticket.row + ':' + ticket.seat;
    const data = await Film.findOne({
      id: ticket.film,
      schedule: {
        $elemMatch: {
          id: ticket.session,
          daytime: ticket.daytime,
          taken: { $elemMatch: { $eq: taken } },
        },
      },
    });
    return !!data;
  }

  async updateSheduleToken(ticket: CreateTicketDto) {
    const taken = ticket.row + ':' + ticket.seat;
    await Film.updateOne(
      {
        id: ticket.film,
        schedule: {
          $elemMatch: {
            id: ticket.session,
            daytime: ticket.daytime,
          },
        },
      },
      {
        $push: { 'schedule.$.taken': taken },
      },
    );
  }
}
