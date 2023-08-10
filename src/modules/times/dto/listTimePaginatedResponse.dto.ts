import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

import { DayTimeRecordsDTO } from './types/dayTimeRecords.dto';

export class ListTimePaginatedResponseDTO {
  @ApiProperty({ type: [DayTimeRecordsDTO] })
  @Type(() => DayTimeRecordsDTO)
  @ValidateNested({ each: true })
  times: DayTimeRecordsDTO[];

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  total: number;
}
