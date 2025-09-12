import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import Order from './schema/order.schema';
import { FilmsService } from '../films/films.service';

@Injectable()
export class OrderService {
  constructor(private filmsService: FilmsService) {}
  async createOrder(order: CreateOrderDto) {
    try {
      const orderData = await Order.create(order);
      await orderData.save();

      for (const ticket of orderData.tickets) {
        await this.filmsService.updateReserved(ticket);
      }

      return {
        total: orderData.tickets.length,
        items: orderData.tickets,
      };
    } catch (error) {
      throw error;
    }
  }
}
