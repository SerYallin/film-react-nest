import { IsMongoId, IsString } from 'class-validator';
//TODO описать DTO для запросов к /films

export class GetFilmScheduleDto {
  @IsString()
  @IsMongoId({
    message: 'Не известный id фильма',
  })
  id: string;
}
