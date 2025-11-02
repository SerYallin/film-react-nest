import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsService } from '../films/films.service';
import { OrdersRepository } from '../repository/orders.repository';

describe('OrderService', () => {
  let service: OrderService;
  let mockOrdersRepository: Partial<OrdersRepository>;
  let mockFilmsService: Partial<FilmsService>;

  const mockOrderDto = {
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
    mockOrdersRepository = {
      createOrder: jest.fn(),
    };
    mockFilmsService = {
      isReserved: jest.fn(),
      updateReserved: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: OrdersRepository, useValue: mockOrdersRepository },
        { provide: FilmsService, useValue: mockFilmsService },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('успешное создание заказа', async () => {
    // Мокаем, что все места свободны
    mockFilmsService.isReserved = jest.fn().mockResolvedValue(false);
    // Мокаем создание заказа
    const mockOrderData = {
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
    mockOrdersRepository.createOrder = jest
      .fn()
      .mockResolvedValue(mockOrderData);

    const result = await service.createOrder(mockOrderDto);

    expect(mockFilmsService.isReserved).toHaveBeenCalledTimes(2);
    expect(mockOrdersRepository.createOrder).toHaveBeenCalledWith(mockOrderDto);
    expect(mockFilmsService.updateReserved).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      total: 2,
      items: mockOrderData.tickets,
    });
  });

  it('если места заняты, возвращается ошибка', async () => {
    // Мокаем, что хотя бы одно место занято
    mockFilmsService.isReserved = jest
      .fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);

    const result = await service.createOrder(mockOrderDto);

    expect(mockFilmsService.isReserved).toHaveBeenCalledTimes(2);
    expect(mockOrdersRepository.createOrder).not.toHaveBeenCalled();
    expect(mockFilmsService.updateReserved).not.toHaveBeenCalled();
    expect(result).toEqual({ error: 'Seats are not available' });
  });

  it('обработка ошибок при создании заказа', async () => {
    // Мокаем ошибку при создании заказа
    mockOrdersRepository.createOrder = jest
      .fn()
      .mockRejectedValue(new Error('DB error'));

    await expect(service.createOrder(mockOrderDto)).rejects.toThrow('DB error');

    expect(mockOrdersRepository.createOrder).toHaveBeenCalled();
    expect(mockFilmsService.updateReserved).not.toHaveBeenCalled();
  });

  it('обработка ошибок при проверке билетов', async () => {
    // Мокаем ошибку при вызове isReserved
    mockFilmsService.isReserved = jest
      .fn()
      .mockRejectedValue(new Error('Service error'));

    await expect(service.createOrder(mockOrderDto)).rejects.toThrow(
      'Service error',
    );

    expect(mockFilmsService.isReserved).toHaveBeenCalled();
    expect(mockOrdersRepository.createOrder).not.toHaveBeenCalled();
    expect(mockFilmsService.updateReserved).not.toHaveBeenCalled();
  });
});
