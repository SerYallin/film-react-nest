import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTicketDto } from '../../ticket/dto/ticket.dto';
//TODO реализовать DTO для /orders
export class CreateOrderDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ValidateNested()
  tickets: CreateTicketDto[];
}
