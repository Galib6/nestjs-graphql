import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/libs/core/auth/auth.module';
import { NodeObjectEntity } from '@src/libs/db/entities/nodeObject.entity';

import { ActionModule } from '../action/action.module';

import { ResponseModule } from '../response/response.module';
import { TriggerModule } from '../trigger';
import { NodeObjectResolver } from './nodeObject.resolver';
import { NodeObjectService } from './nodeObject.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NodeObjectEntity]),
    AuthModule,
    ActionModule,
    TriggerModule,
    ResponseModule,
  ],
  providers: [NodeObjectService, NodeObjectResolver],
  exports: [NodeObjectService],
})
export class NodeObjectModule {}
