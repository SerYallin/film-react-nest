import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'prac',
  entities: [__dirname + '/src/**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/test/migrations/*{.ts,.js}'],
  synchronize: true,
});
