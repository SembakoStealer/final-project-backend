import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('PGUSER', 'postgres'),
        password: configService.get('PGPASSWORD', 'postgres'),
        database: configService.get('PGDATABASE', 'ecommerce'),
        ssl: { rejectUnauthorized: false },
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: false,
      }),      
    }),
    CategoriesModule,
    ProductModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
