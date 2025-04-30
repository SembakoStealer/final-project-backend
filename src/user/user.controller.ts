import { Controller, Get, Logger, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { User } from './user.entity';
import { ProfileDTO } from './profile.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getUser(@Req() request: Request): Promise<ProfileDTO> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    const user: User | null = await this.userService.findByEmail(userJwtPayload.email);
    
    if (!user) {
      throw new NotFoundException();
    }

    return {
      username: user.username,
      email: user.email,
      bio: user.bio,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }
}
