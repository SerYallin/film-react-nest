import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
export class CreateTicketDto {
  @IsString()
  @IsMongoId({
    message: 'Не известный id фильма',
  })
  film: string;

  @IsString()
  @IsUUID(null, {
    message: 'Не известный id сеанса',
  })
  session: string;

  @IsString()
  @IsDateString(null, {
    message: 'Не верный формат даты',
  })
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}
