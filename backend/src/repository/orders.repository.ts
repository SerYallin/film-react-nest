import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../order/entity/orders.entity';
import { Tickets } from '../ticket/entity/tickets.entity';
import { CreateOrderDto } from '../order/dto/order.dto';
import { Schedules } from '../schedule/entity/schedules.entity';
import { Films } from '../films/entity/films.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private orders: Repository<Orders>,
    @InjectRepository(Schedules)
    private schedules: Repository<Schedules>,
    @InjectRepository(Films)
    private films: Repository<Films>,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<Orders> {
    try {
      const order = await this.orders.save(await this.getOrder(orderDto));
      return order;
    } catch (error) {
      throw new error();
    }
  }

  async getOrder(orderDto: CreateOrderDto): Promise<Orders> {
    const order = new Orders();
    order.phone = orderDto.phone;
    order.email = orderDto.email;
    order.tickets = await Promise.all(
      orderDto.tickets.map(async (ticketDto) => {
        const ticket = new Tickets();
        ticket.daytime = ticketDto.daytime;
        ticket.seat = ticketDto.seat;
        ticket.row = ticketDto.row;
        ticket.price = ticketDto.price;
        ticket.session = await this.schedules.findOne({
          where: { id: ticketDto.session },
        });
        ticket.film = await this.films.findOne({
          where: { id: ticketDto.film },
        });
        return ticket;
      }),
    );
    return order;
  }
}
