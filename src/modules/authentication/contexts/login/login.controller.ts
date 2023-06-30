import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { addSeconds } from 'date-fns';
import { Response } from 'express';

import { AUTHENTICATION } from '@config/constants/tags.constants';
import env from '@config/env';

import { LoginRequestDTO } from '@modules/authentication/dto/login.dto';
import { User } from '@modules/users/entity/User.entity';

import { LoginService } from './login.service';

@ApiTags(AUTHENTICATION)
@Controller(AUTHENTICATION.toLowerCase())
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('/login')
  async handler(
    @Body() dto: LoginRequestDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, token } = await this.loginService.execute(dto);
    response.cookie('Authorization', token, {
      domain: env().domain,
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
      expires: addSeconds(new Date(Date.now()), parseInt(env().jwt.expiresIn)),
    });

    return {
      user: plainToInstance(User, user),
    };
  }
}
