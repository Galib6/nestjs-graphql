import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseEntity } from '@src/libs/db/entities/response.entity';

import { PinoLogger } from 'nestjs-pino';
import { In, Repository } from 'typeorm';
import {
  CreateResponseInput,
  UpdateResponseInput,
} from './dtos/response.inputs';

@Injectable()
export class ResponseService {
  constructor(
    private logger: PinoLogger,
    @InjectRepository(ResponseEntity)
    private responseRepository: Repository<ResponseEntity>,
  ) {}

  async createResponse(input: CreateResponseInput): Promise<ResponseEntity> {
    try {
      const response = this.responseRepository.create({
        ...input,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      const savedResponse = await this.responseRepository.save(response);
      this.logger.info(`Response created with ID: ${savedResponse._id}`);
      return savedResponse;
    } catch (error) {
      this.logger.error('Error creating response:', error);
      throw new BadRequestException('Failed to create response');
    }
  }

  async updateResponse(input: UpdateResponseInput): Promise<ResponseEntity> {
    try {
      const { _id, ...updateData } = input;

      const existingResponse = await this.responseRepository.findOne({
        where: { _id },
      });

      if (!existingResponse) {
        throw new NotFoundException(`Response with ID ${_id} not found`);
      }

      const updatedResponse = await this.responseRepository.save({
        ...existingResponse,
        ...updateData,
        updatedAt: Date.now(),
      });

      this.logger.info(`Response updated with ID: ${updatedResponse._id}`);
      return updatedResponse;
    } catch (error) {
      this.logger.error('Error updating response:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update response');
    }
  }

  async getResponseById(id: string): Promise<ResponseEntity | null> {
    try {
      return await this.responseRepository.findOne({
        where: { _id: id },
      });
    } catch (error) {
      this.logger.error(`Error fetching response ${id}:`, error);
      return null;
    }
  }

  async getResponsesByIds(ids: string[]): Promise<ResponseEntity[]> {
    if (!ids || ids.length === 0) return [];

    try {
      return await this.responseRepository.findBy({
        _id: In(ids),
      });
    } catch (error) {
      this.logger.error('Error fetching responses by IDs:', error);
      return [];
    }
  }

  async getAllResponses(): Promise<ResponseEntity[]> {
    try {
      return await this.responseRepository.find();
    } catch (error) {
      this.logger.error('Error fetching all responses:', error);
      return [];
    }
  }

  async deleteResponse(id: string): Promise<boolean> {
    try {
      const result = await this.responseRepository.delete({ _id: id });
      const deleted =
        typeof result.affected === 'number' && result.affected > 0;

      if (deleted) {
        this.logger.info(`Response deleted with ID: ${id}`);
      } else {
        this.logger.warn(`No response found to delete with ID: ${id}`);
      }

      return deleted;
    } catch (error) {
      this.logger.error(`Error deleting response ${id}:`, error);
      throw new BadRequestException('Failed to delete response');
    }
  }
}
