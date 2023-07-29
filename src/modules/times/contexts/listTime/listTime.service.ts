import { Inject, Injectable } from '@nestjs/common';
import { differenceInMilliseconds, format, intervalToDuration } from 'date-fns';

import { TIME_REPOSITORY } from '@config/constants/repositories.constants';

import { ListTimeDTO } from '@modules/times/dto/listTime.dto';
import { TimeRespository } from '@modules/times/repositories/implementations/time.repository';

@Injectable()
export class ListTimeService {
  constructor(
    @Inject(TIME_REPOSITORY)
    private readonly timeRepository: TimeRespository,
  ) {}
  async execute({ id }: ListTimeDTO) {
    const times = await this.timeRepository.find({ userId: id });
    const serializedTimes = times.reduce((acc, { time }) => {
      const timeKey = format(time, 'dd/MM/yyyy');
      const timeWithoutTimeZone = time;
      acc[timeKey]
        ? acc[timeKey].push(timeWithoutTimeZone)
        : (acc[timeKey] = [timeWithoutTimeZone]);
      return acc;
    }, {});

    const timeKeys = Object.keys(serializedTimes);
    const datesAndTimes = timeKeys.map((timeKey) => {
      let finish = 0;
      const timeArray = serializedTimes[timeKey];
      const iterations = Math.floor(timeArray.length / 2);

      for (let i = 0; i < iterations; i++) {
        finish += differenceInMilliseconds(
          timeArray[2 * i + 1],
          timeArray[2 * i],
        );
      }

      const response = {
        date: timeKey,
        time: intervalToDuration({ start: 0, end: finish }),
        timeArray,
      };
      return response;
    });

    return datesAndTimes.reverse();
  }
}
