import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TriggerEntity } from '@src/libs/db/entities/trigger.entity';
import { Repository } from 'typeorm';
import { TriggerInput } from './dtos/trigger.inputs';

@Injectable()
export class TriggerService {
  constructor(
    @InjectRepository(TriggerEntity)
    private readonly triggerRepository: Repository<TriggerEntity>,
  ) {}

  async createTrigger(input: TriggerInput): Promise<TriggerEntity> {
    try {
      const trigger = this.triggerRepository.create(
        input as Partial<TriggerEntity>,
      );
      return await this.triggerRepository.save(trigger);
    } catch (error) {
      throw new BadRequestException('Failed to create trigger');
    }
  }

  async getAllTriggers(): Promise<TriggerEntity[]> {
    return await this.triggerRepository.find();
  }

  async getTriggerById(_id: string): Promise<TriggerEntity | null> {
    return await this.triggerRepository.findOne({ where: { _id } });
  }

  async updateTrigger(
    _id: string,
    input: Partial<TriggerInput>,
  ): Promise<TriggerEntity> {
    const trigger = await this.getTriggerById(_id);
    if (!trigger) {
      throw new NotFoundException(`Trigger with ID ${_id} not found`);
    }
    Object.assign(trigger, input, { updatedAt: Date.now() });
    return await this.triggerRepository.save(trigger);
  }

  async deleteTrigger(_id: string): Promise<boolean> {
    const result = await this.triggerRepository.delete(_id);
    return !!result.affected && result.affected > 0;
  }
}
