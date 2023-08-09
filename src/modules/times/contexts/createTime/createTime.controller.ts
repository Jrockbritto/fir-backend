import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

import { TIME } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import { CreateTimeRequestDTO } from '@modules/times/dto/createTime.dto';
import { CreateTimeResponseDTO } from '@modules/times/dto/createTimeReponse.dto';
import { Time } from '@modules/times/entity/Time.entity';
import { User } from '@modules/users/entity/User.entity';

import { CreateTimeService } from './createTime.service';

@ApiBearerAuth()
@Controller(TIME.toLowerCase())
@ApiTags(TIME)
export class CreateTimeController {
  constructor(private readonly createTimeService: CreateTimeService) {}
  @ApiCreatedResponse({ type: CreateTimeResponseDTO })
  @Post()
  @UseGuards(JwtAuthGuard)
  async handler(@Body() dto: CreateTimeRequestDTO, @Req() req: Request) {
    const time = await this.createTimeService.execute({
      ...dto,
      userId: (req.user as User).id,
    });
    return { time: plainToInstance(Time, time) };
  }
}
