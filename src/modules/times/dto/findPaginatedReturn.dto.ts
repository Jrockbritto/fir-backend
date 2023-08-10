import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

import { Time } from '../entity/Time.entity';

export class FindPaginatedReturnDTO {
  @ApiProperty({ type: [Time] })
  @Type(() => Time)
  @ValidateNested({ each: true })
  times: Time[];

  @ApiProperty({ type: Number })
  @IsNumber()
  total: number;
}
