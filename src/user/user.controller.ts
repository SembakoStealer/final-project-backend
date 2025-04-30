import {
  Controller,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { User } from './user.entity';
import { ProfileDTO } from './profile.dto';
import { UpdateProfileDto } from './update-profile.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
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
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update the current user profile' })
  async updateProfile(
    @Req() request: Request,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileDTO> {
    const userJwtPayload: JwtPayloadDto = request['user'];
    const user = await this.userService.findByEmail(userJwtPayload.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userService.updateProfile(user.id, dto);

    return {
      username: updatedUser.username,
      email: updatedUser.email,
      bio: updatedUser.bio,
      created_at: updatedUser.created_at,
      updated_at: updatedUser.updated_at,
    };
  }
}
