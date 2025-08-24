import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  createOrder(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return {};
  }
}
