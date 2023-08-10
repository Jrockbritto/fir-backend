import { InjectRepository } from '@nestjs/typeorm';
import { addDays } from 'date-fns';
import { Between, Repository } from 'typeorm';

import { ICreateTimeDTO } from '@modules/times/dto/ICreateTime.dto';
import { IFindTimeDTO } from '@modules/times/dto/IFindTime.dto';
import { IFindTimePaginatedDTO } from '@modules/times/dto/IFindTimePaginated.dto';
import { Time } from '@modules/times/entity/Time.entity';

import { ITimeRepository } from '../timeRepository.interface';

export class TimeRespository implements ITimeRepository {
  constructor(
    @InjectRepository(Time)
    private readonly repository: Repository<Time>,
  ) {}

  async findPaginated({ userId, page, perPage }: IFindTimePaginatedDTO) {
    const start = (page - 1) * perPage;
    const end = page * perPage - 1;
    const total: Array<{ date: Date }> = await this.repository.query(
      `
      SELECT DATE(time) FROM times AS t
      Where t.user_id = $1
      group by DATE(t.time)
      order by DATE(t.time) DESC;
      `,
      [userId],
    );

    if (start > total.length - 1) return [];
    return this.repository.find({
      where: {
        time: Between(
          total[end]?.date || total[total.length - 1].date,
          addDays(total[start].date, 1),
        ),
        userId,
      },
      order: {
        time: 'DESC',
      },
    });
  }

  async create({ userId, time }: ICreateTimeDTO): Promise<Time> {
    const timeEntity = this.repository.create({ userId, time });
    return this.repository.save(timeEntity);
  }

  async find({ userId }: IFindTimeDTO): Promise<Time[]> {
    const time = await this.repository.find({
      where: { userId },
      order: { time: 'ASC' },
    });
    return time;
  }
  async delete(timeId: string): Promise<Time | null> {
    const time = await this.repository.findOne({ where: { id: timeId } });
    if (time) {
      time.deletedAt = new Date();
      return this.repository.save(time);
    }
    return null;
  }
}
