import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { USER } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import { CreateUserDTO } from '@modules/users/dto/createUser.dto';
import { CreateUserResponseDTO } from '@modules/users/dto/createUSerResponse.dto';
import { User } from '@modules/users/entity/User.entity';

import { CreateUserService } from './createUser.service';

@ApiBearerAuth()
@Controller(USER.toLowerCase())
@ApiTags(USER)
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}
  @Post()
  @ApiCreatedResponse({ type: CreateUserResponseDTO })
  @UseGuards(JwtAuthGuard)
  async handler(@Body() { email, lastName, name, password }: CreateUserDTO) {
    const user = await this.createUserService.execute({
      email,
      lastName,
      name,
      password,
    });
    return { user: plainToInstance(User, user) };
  }
}
