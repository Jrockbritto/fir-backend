import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from '@config/typeorm';

import { AuthenticationModule } from '@modules/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    AuthenticationModule,
  ],
})
export class AppModule {}
