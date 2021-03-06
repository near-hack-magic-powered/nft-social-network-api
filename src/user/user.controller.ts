import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.quard';
import { SearchRequest } from 'src/common/search.interface';
import { PaginationResponse } from 'src/common/pagination.interface';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserProfileDto } from './dto/user-profile.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchUsers(
    @Query() query: SearchRequest,
  ): Promise<PaginationResponse<User>> {
    return this.userService.searchUsers(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyUser(@Request() req): Promise<User> {
    return this.userService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('my/profile')
  async updateUserProfile(
    @Request() req,
    @Body() body: UserProfileDto,
  ): Promise<boolean> {
    return this.userService.updateUserProfile(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('my/near-account/:accountId/enable')
  async enableNearWallet(
    @Request() req,
    @Param('accountId') accountId: string,
  ): Promise<User> {
    return this.userService.setNearAccountStatus(
      req.user.userId,
      accountId,
      true,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('my/near-account/:accountId/disable')
  async disableNearWallet(
    @Request() req,
    @Param('accountId') accountId: string,
  ): Promise<User> {
    return this.userService.setNearAccountStatus(
      req.user.userId,
      accountId,
      false,
    );
  }
}
