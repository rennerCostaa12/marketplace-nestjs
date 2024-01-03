import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesProductsModule } from './categories_products/categories_products.module';
import { AdminsModule } from './admins/admins.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { StatusSalesModule } from './status_sales/status_sales.module';
import { AuthModule } from './auth/auth.module';
import { FormsPaymentsModule } from './forms_payments/forms_payments.module';
import { FormDeliveryModule } from './form_delivery/form_delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          ProductsModule,
          CategoriesProductsModule,
          AdminsModule,
          ClientsModule,
          StatusSalesModule,
          SalesModule,
        ],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    CategoriesProductsModule,
    AdminsModule,
    ClientsModule,
    SalesModule,
    StatusSalesModule,
    AuthModule,
    FormsPaymentsModule,
    FormDeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
