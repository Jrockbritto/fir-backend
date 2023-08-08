import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { TIME } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import { ListTimeDTO } from '@modules/times/dto/listTime.dto';
import { PaginationOptions } from '@modules/times/dto/paginationOptions.dto';
import { DayTimeRecordsDTO } from '@modules/times/dto/types/dayTimeRecords.dto';

import { ListTimeService } from './listTime.service';

@ApiBearerAuth()
@Controller(TIME.toLowerCase())
@ApiTags(TIME)
export class ListTimeController {
  constructor(private readonly listTimeService: ListTimeService) {}
  @Get('users/:id')
  @ApiOkResponse({ type: [DayTimeRecordsDTO] })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  handler(
    @Param() { id }: ListTimeDTO,
    @Query() { page, perPage }: PaginationOptions,
  ) {
    return this.listTimeService.execute({ id, page, perPage });
  }
}
