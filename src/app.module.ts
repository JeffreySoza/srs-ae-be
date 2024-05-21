import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'jeff2407',
    database: 'srs_ae',
    entities: [User, Role],
    synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    retryAttempts: 3,
    retryDelay: 5000,
    autoLoadEntities: true // With that option specified, every entity registered through the forFeature() method will be automatically added to the entities array of the configuration object.
  }),
    RolesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  // the TypeORM DataSource and EntityManager objects will be available to inject across the entire project (without needing to import any modules)
  constructor(private dataSource: DataSource) { }
}
