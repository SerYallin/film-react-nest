import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let mockOrderService: Partial<OrderService>;

  const mockCreateOrderDto: CreateOrderDto = {
    email: 'test@test.com',
    phone: '+79999999999',
    tickets: [
      {
        film: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
        session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
        daytime: '2024-06-28T16:00:53+03:00',
        row: 3,
        seat: 4,
        price: 100.0,
      },
      {
        film: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
        session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
        daytime: '2024-06-28T16:00:53+03:00',
        row: 3,
        seat: 3,
        price: 100.0,
      },
    ],
  };

  beforeEach(async () => {
    mockOrderService = {
      createOrder: jest.fn().mockResolvedValue({
        total: 2,
        items: mockCreateOrderDto.tickets,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('должен вызывать createOrder у сервиса и возвращать результат', async () => {
    const result = await controller.createOrder(mockCreateOrderDto);
    expect(mockOrderService.createOrder).toHaveBeenCalledWith(
      mockCreateOrderDto,
    );
    expect(result).toEqual({
      total: 2,
      items: mockCreateOrderDto.tickets,
    });
  });
});
