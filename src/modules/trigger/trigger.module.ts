import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/libs/core/auth/auth.module';
import { TriggerEntity } from '@src/libs/db/entities/trigger.entity';
import { TriggerResolver } from './trigger.resolver';
import { TriggerService } from './trigger.service';

@Module({
  imports: [TypeOrmModule.forFeature([TriggerEntity]), AuthModule],
  providers: [TriggerService, TriggerResolver],
  exports: [TriggerService],
})
export class TriggerModule {}
