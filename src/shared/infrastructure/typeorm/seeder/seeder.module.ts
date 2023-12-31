import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import { USER_REPOSITORY } from '@config/constants/repositories.constants';
import { dataSourceOptions } from '@config/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/implementations/bcrypt.provider';

import { User } from '@modules/users/entity/User.entity';
import { UserRepository } from '@modules/users/repositories/implementations/user.repository';

import { Seeder } from './seed';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    Logger,
    Seeder,
    { provide: ENCRYPT_PROVIDER, useClass: BcryptProvider },
    { provide: USER_REPOSITORY, useClass: UserRepository },
  ],
})
export class SeederModule {}
