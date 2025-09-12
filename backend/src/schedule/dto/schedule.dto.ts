export class GetScheduleItemDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: [string];
}

export class GetScheduleDto {
  items: GetScheduleItemDto[];
}
