import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity'; // adjust the path if needed
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { CategoriesModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  CategoriesModule
],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
