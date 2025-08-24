import {
  IsDateString,
  IsEmail,
  IsMongoId,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
//TODO реализовать DTO для /orders
export class TicketDto {
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
export class CreateOrderDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ValidateNested()
  tickets: TicketDto[];
}
