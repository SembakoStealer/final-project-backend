import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // ✅ Use connection string
  entities: [User, Category, Product],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  ssl: true, // ✅ Required by Neon
});

export default AppDataSource;
