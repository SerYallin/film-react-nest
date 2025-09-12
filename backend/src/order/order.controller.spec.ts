import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsService } from '../films/films.service';
import { FilmsRepository } from '../repository/films.repository';

describe('OrderController', () => {
  let controller: OrderController;
  const mockFilmsRepository = {
    getFilms: jest.fn(),
    getFilmSchedule: jest.fn(),
    updateSheduleToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        FilmsService,
        { provide: FilmsRepository, useValue: mockFilmsRepository },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
