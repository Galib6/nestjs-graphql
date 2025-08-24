import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/libs/core/auth/auth.module';
import { ActionEntity } from '@src/libs/db/entities/action.entity';

import { ResourceTemplateModule } from '../reponseTemplate/resourceTemplate.module';
import { ActionResolver } from './action.resolver';
import { ActionService } from './action.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActionEntity]),
    AuthModule,
    ResourceTemplateModule,
  ],
  providers: [ActionService, ActionResolver],
  exports: [ActionService],
})
export class ActionModule {}
