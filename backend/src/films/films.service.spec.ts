import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { CreateTicketDto } from '../ticket/dto/ticket.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  const mockFilmsRepository = {
    getFilms: jest.fn(),
    getFilmSchedule: jest.fn(),
    updateSheduleToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: FilmsRepository, useValue: mockFilmsRepository },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call getFilms on repository', async () => {
    const mockFilms = [{ id: 1, name: 'Film 1' }];
    mockFilmsRepository.getFilms.mockResolvedValue(mockFilms);

    const result = await service.getFilms();

    expect(mockFilmsRepository.getFilms).toHaveBeenCalled();
    expect(result).toEqual(mockFilms);
  });

  it('should call getFilmSchedule with correct id', async () => {
    const schedule = { id: '1', schedule: [] };
    mockFilmsRepository.getFilmSchedule.mockResolvedValue(schedule);
    const data = { id: '1' };

    const result = await service.getFilmSchedule(data);

    expect(mockFilmsRepository.getFilmSchedule).toHaveBeenCalledWith(data.id);
    expect(result).toEqual(schedule);
  });

  it('should call updateSheduleToken with ticket', async () => {
    const ticket = {} as CreateTicketDto;
    mockFilmsRepository.updateSheduleToken.mockResolvedValue(null);

    await service.updateReserved(ticket);

    expect(mockFilmsRepository.updateSheduleToken).toHaveBeenCalledWith(ticket);
  });
});
