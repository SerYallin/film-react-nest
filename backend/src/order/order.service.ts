import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsService } from '../films/films.service';
import { CreateTicketDto } from '../ticket/dto/ticket.dto';
import { OrdersRepository } from '../repository/orders.repository';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private filmsService: FilmsService,
  ) {}
  async createOrder(order: CreateOrderDto) {
    try {
      const isAvailable = await this.checkSeatsAvailability(order.tickets);
      if (!isAvailable) {
        return {
          error: 'Seats are not available',
        };
      }
      const orderData = await this.ordersRepository.createOrder(order);

      for (const ticket of order.tickets) {
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

  private async checkSeatsAvailability(
    tickets: CreateTicketDto[],
  ): Promise<boolean> {
    const checkPromises = tickets.map((ticket) =>
      this.filmsService.isReserved(ticket),
    );
    const results = await Promise.all(checkPromises);
    return !results.includes(true);
  }
}
