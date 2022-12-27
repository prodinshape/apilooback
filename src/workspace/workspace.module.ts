import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  exports: [TypeOrmModule, WorkspaceService],
  providers: [WorkspaceService],
})

export class WorkspaceModule {}
