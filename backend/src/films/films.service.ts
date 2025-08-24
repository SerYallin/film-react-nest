import { Injectable } from '@nestjs/common';
import { GetFilmScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  getFilms() {
    return [];
  }
  getFilmSchedule(data: GetFilmScheduleDto) {
    console.log(data.id);
    return {};
  }
}
