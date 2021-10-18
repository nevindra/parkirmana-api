import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    VehiclesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.101.64.30',
      port: 5432,
      username: 'postgres',
      password: '2fuckingco0l',
      database: 'smart-parking',
      autoLoadEntities: true,
      entities: ['dist/**/*.entity.js'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
