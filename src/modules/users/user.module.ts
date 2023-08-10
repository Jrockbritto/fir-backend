import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { BcryptProvider } from '@shared/providers/EncryptProvider/implementations/bcrypt.provider';

import { User } from '@modules/users/entity/User.entity';

import { CreateUserController } from './contexts/createUser/createUser.controller';
import { CreateUserService } from './contexts/createUser/createUser.service';
import { UserRepository } from './repositories/implementations/user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    CreateUserService,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: ENCRYPT_PROVIDER, useClass: BcryptProvider },
  ],
  controllers: [CreateUserController],
})
export class UserModule {}
