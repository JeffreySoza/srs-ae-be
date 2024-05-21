import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();
export default new DataSource({
    type: 'mysql',
    username: 'root',
    password: 'jeff2407',
    host: 'localhost',
    port: 3306,
    database: 'srs_ae',
    entities: ['dist/**/**/*.entity.js'],
    migrations: ['dist/**/migrations/*.js'],
});