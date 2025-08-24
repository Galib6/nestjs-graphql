import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/libs/core/auth/auth.module';
import { ResponseEntity } from '@src/libs/db/entities/response.entity';
import { ResponseResolver } from './response.resolver';
import { ResponseService } from './response.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseEntity]), AuthModule],
  providers: [ResponseService, ResponseResolver],
  exports: [ResponseService],
})
export class ResponseModule {}
