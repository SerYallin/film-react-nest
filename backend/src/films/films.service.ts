import { Injectable } from '@nestjs/common';
import { GetFilmScheduleDto } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';
import { CreateTicketDto } from '../ticket/dto/ticket.dto';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}
  getFilms() {
    return this.filmsRepository.getFilms();
  }
  getFilmSchedule(data: GetFilmScheduleDto) {
    return this.filmsRepository.getFilmSchedule(data.id);
  }

  updateReserved(ticket: CreateTicketDto) {
    return this.filmsRepository.updateSheduleToken(ticket);
  }
}
