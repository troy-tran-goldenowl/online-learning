import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  synchronize: false,
  database: 'online-learning',
  entities: ['build/**/*.entity.js'],
  migrations: ['build/database/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
