import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    const user = this.userRepository.findOne({
      where: [{ email }, { username }],
    });
    return user;
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateProfile(id: number, dto: UpdateProfileDto): Promise<User> {
    await this.userRepository.update(id, {
      ...dto,
      updated_at: new Date(), // optional if your entity doesn't handle it automatically
    });
  
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found after update');
    }
    return user;
  }
  
}
