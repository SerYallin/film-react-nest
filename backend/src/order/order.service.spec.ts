import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsService } from '../films/films.service';
import { FilmsRepository } from '../repository/films.repository';

describe('OrderService', () => {
  let service: OrderService;
  const mockFilmsRepository = {
    getFilms: jest.fn(),
    getFilmSchedule: jest.fn(),
    updateSheduleToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        FilmsService,
        { provide: FilmsRepository, useValue: mockFilmsRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
