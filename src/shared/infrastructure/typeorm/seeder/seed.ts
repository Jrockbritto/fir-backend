import { Inject, Injectable, Logger } from '@nestjs/common';
import { addHours, subDays } from 'date-fns';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import {
  TIME_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/repositories.constants';

import { IEncryptProvider } from '@shared/providers/EncryptProvider/encryptProvider.interface';

import { Time } from '@modules/times/entity/Time.entity';
import { ITimeRepository } from '@modules/times/repositories/timeRepository.interface';
import { User } from '@modules/users/entity/User.entity';
import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

import { userData } from './data';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    @Inject(ENCRYPT_PROVIDER)
    private readonly encryptProvider: IEncryptProvider,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(TIME_REPOSITORY)
    private readonly timeRepository: ITimeRepository,
  ) {}
  public async seed() {
    try {
      const users = await this.user();
      this.logger.debug('Successfully completed seeding user');
      await this.times(users);
      this.logger.debug('Successfully completed seeding times');
    } catch (error) {
      this.logger.debug('Failed seeding user');
    }
  }

  private async user() {
    const userPromises = userData.map(
      async ({ name, lastName, email, password }) => {
        const user = await this.userRepository.create({
          name,
          lastName,
          email,
          password: await this.encryptProvider.generateHash(password),
        });
        return user;
      },
    );

    return Promise.all(userPromises);
  }
  private async times(users: User[]) {
    const timePromises = users.map(async ({ id }) => {
      await this.timesUser(id);
    });

    return Promise.all(timePromises);
  }

  private async timesUser(id: string) {
    const arrayTimes: Array<Promise<Time>> = [];
    for (let i = 0; i < 10; i++) {
      const time1 = this.timeRepository.create({
        userId: id,
        time: subDays(new Date('2023-12-17T11:24:00'), i),
      });
      const time2 = this.timeRepository.create({
        userId: id,
        time: subDays(addHours(new Date('2023-12-17T11:24:00'), 1), i),
      });
      arrayTimes.push(time1, time2);
    }
    return Promise.all(arrayTimes);
  }
}
