import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/libs/core/auth/auth.module';
import { UserEntity } from '@src/libs/db/entities';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],

  providers: [UserResolver, UserService],
})
export class UserModule {}
