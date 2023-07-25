import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from '@config/typeorm';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { TimeModule } from '@modules/times/time.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    AuthenticationModule,
    UserModule,
    TimeModule,
  ],
})
export class AppModule {}
