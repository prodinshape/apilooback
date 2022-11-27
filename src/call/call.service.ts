import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { Call } from './entities/call.entity';

@Injectable()
export class CallService {
  constructor(
    @InjectRepository(Call)
    private callsRepository: Repository<Call>,
  ) {}

  create(createCallDto: CreateCallDto) {
    return this.callsRepository.save(createCallDto);
  }

  findAll() {
    return this.callsRepository.find();
  }

  findOne(id: number) {
    return this.callsRepository.findOneBy({id});
  }

  update(id: number, updateCallDto: UpdateCallDto) {
    return this.callsRepository.update(id, updateCallDto);
  }

  remove(id: number) {
    return this.callsRepository.delete(id);
  }
}
