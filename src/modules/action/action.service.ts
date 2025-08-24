import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionEntity } from '@src/libs/db/entities/action.entity';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { CreateActionInput, UpdateActionInput } from './dtos/action.inputs';

@Injectable()
export class ActionService {
  constructor(
    private logger: PinoLogger,
    @InjectRepository(ActionEntity)
    private actionRepository: Repository<ActionEntity>,
  ) {}

  async createAction(input: CreateActionInput): Promise<ActionEntity> {
    try {
      const action = this.actionRepository.create({
        ...input,
      });

      const savedAction = await this.actionRepository.save(action);
      this.logger.info(`Action created with ID: ${savedAction._id}`);
      return savedAction;
    } catch (error) {
      this.logger.error('Error creating action:', error);
      throw new BadRequestException('Failed to create action');
    }
  }

  async updateAction(input: UpdateActionInput): Promise<ActionEntity> {
    try {
      const { _id, ...updateData } = input;

      const existingAction = await this.actionRepository.findOne({
        where: { _id },
      });

      if (!existingAction) {
        throw new NotFoundException(`Action with ID ${_id} not found`);
      }

      const updatedAction = await this.actionRepository.save({
        ...existingAction,
        ...updateData,
        updatedAt: Date.now(),
      });

      this.logger.info(`Action updated with ID: ${updatedAction._id}`);
      return updatedAction;
    } catch (error) {
      this.logger.error('Error updating action:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update action');
    }
  }

  async getActionById(id: string): Promise<ActionEntity | null> {
    try {
      return await this.actionRepository.findOne({
        where: { _id: id },
        relations: ['resourceTemplate'],
      });
    } catch (error) {
      this.logger.error(`Error fetching action ${id}:`, error);
      return null;
    }
  }

  async getActionsByIds(ids: string[]): Promise<ActionEntity[]> {
    if (!ids || ids.length === 0) return [];

    try {
      return await this.actionRepository
        .createQueryBuilder('action')
        .leftJoinAndSelect('action.resourceTemplate', 'resourceTemplate')
        .where('action._id IN (:...ids)', { ids })
        .getMany();
    } catch (error) {
      this.logger.error('Error fetching actions by IDs:', error);
      return [];
    }
  }

  async getAllActions(): Promise<ActionEntity[]> {
    try {
      return await this.actionRepository.find({
        relations: ['resourceTemplate'],
      });
    } catch (error) {
      this.logger.error('Error fetching all actions:', error);
      return [];
    }
  }

  async deleteAction(id: string): Promise<boolean> {
    try {
      const result = await this.actionRepository.delete({ _id: id });
      const deleted =
        typeof result.affected === 'number' && result.affected > 0;

      if (deleted) {
        this.logger.info(`Action deleted with ID: ${id}`);
      } else {
        this.logger.warn(`No action found to delete with ID: ${id}`);
      }

      return deleted;
    } catch (error) {
      this.logger.error(`Error deleting action ${id}:`, error);
      throw new BadRequestException('Failed to delete action');
    }
  }
}
