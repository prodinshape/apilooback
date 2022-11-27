import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  exports: [TypeOrmModule, CallService],
  providers: [CallService],
})

export class CallModule {}
