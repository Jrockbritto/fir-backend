import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import {
  TIME_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/repositories.constants';
import { dataSourceOptions } from '@config/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/implementations/bcrypt.provider';

import { Time } from '@modules/times/entity/Time.entity';
import { TimeRespository } from '@modules/times/repositories/implementations/time.repository';
import { User } from '@modules/users/entity/User.entity';
import { UserRepository } from '@modules/users/repositories/implementations/user.repository';

import { Seeder } from './seed';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    TypeOrmModule.forFeature([User, Time]),
  ],
  providers: [
    Logger,
    Seeder,
    { provide: ENCRYPT_PROVIDER, useClass: BcryptProvider },
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: TIME_REPOSITORY, useClass: TimeRespository },
  ],
})
export class SeederModule {}
