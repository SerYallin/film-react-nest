import { IsString, IsUUID } from 'class-validator';
//TODO описать DTO для запросов к /films

export class GetFilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}
export class GetFilmsDto {
  page: number;
  size: number;
  total: number;
  items: GetFilmDto[];
}
export class GetFilmScheduleDto {
  @IsString()
  @IsUUID(null, {
    message: 'Не известный id фильма',
  })
  id: string;
}
