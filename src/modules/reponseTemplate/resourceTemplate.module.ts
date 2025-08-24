import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/libs/core/auth/auth.module';

import { ResourceTemplateEntity } from '@src/libs/db/entities/resourceTemplate.entity';
import { ResourceTemplateService } from './resource-template.service';
import { ResourceTemplateResolver } from './resourceTemplate.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceTemplateEntity]), AuthModule],
  providers: [ResourceTemplateService, ResourceTemplateResolver],
  exports: [ResourceTemplateService],
})
export class ResourceTemplateModule {}
