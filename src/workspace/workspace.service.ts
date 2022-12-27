import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from './entities/workspace.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
  ) {}

  create(createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesRepository.save(createWorkspaceDto);
  }

  findAll() {
    return this.workspacesRepository.find();
  }

  findOne(id: number) {
    return this.workspacesRepository.findOneBy({id});
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesRepository.update(id, updateWorkspaceDto);
  }

  remove(id: number) {
    return this.workspacesRepository.delete(id);
  }
}
