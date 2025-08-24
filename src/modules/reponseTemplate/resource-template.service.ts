import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceTemplateEntity } from '@src/libs/db/entities/resourceTemplate.entity';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import {
  CreateResourceTemplateInput,
  UpdateResourceTemplateInput,
} from './dtos/resourceTemplate.inputs';

@Injectable()
export class ResourceTemplateService {
  constructor(
    private logger: PinoLogger,
    @InjectRepository(ResourceTemplateEntity)
    private resourceTemplateRepository: Repository<ResourceTemplateEntity>,
  ) {}

  async createResourceTemplate(
    input: CreateResourceTemplateInput,
  ): Promise<ResourceTemplateEntity> {
    try {
      // Check if key already exists (if provided)
      if (input.key) {
        const existingTemplate = await this.resourceTemplateRepository.findOne({
          where: { key: input.key },
        });

        if (existingTemplate) {
          throw new BadRequestException(
            `Resource template with key '${input.key}' already exists`,
          );
        }
      }

      const resourceTemplate = this.resourceTemplateRepository.create({
        ...input,
        // createdAt: Date.now(),
        // updatedAt: Date.now(),
      });

      const savedTemplate =
        await this.resourceTemplateRepository.save(resourceTemplate);
      this.logger.info(
        `Resource template created with ID: ${savedTemplate._id}`,
      );
      return savedTemplate;
    } catch (error) {
      this.logger.error('Error creating resource template:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create resource template');
    }
  }

  async updateResourceTemplate(
    input: UpdateResourceTemplateInput,
  ): Promise<ResourceTemplateEntity> {
    try {
      const { _id, ...updateData } = input;

      const existingTemplate = await this.resourceTemplateRepository.findOne({
        where: { _id },
      });

      if (!existingTemplate) {
        throw new NotFoundException(
          `Resource template with ID ${_id} not found`,
        );
      }

      // Check if key already exists (if updating key)
      if (updateData.key && updateData.key !== existingTemplate.key) {
        const existingWithKey = await this.resourceTemplateRepository.findOne({
          where: { key: updateData.key },
        });

        if (existingWithKey) {
          throw new BadRequestException(
            `Resource template with key '${updateData.key}' already exists`,
          );
        }
      }

      const updatedTemplate = await this.resourceTemplateRepository.save({
        ...existingTemplate,
        ...updateData,
        updatedAt: Date.now(),
      });

      this.logger.info(
        `Resource template updated with ID: ${updatedTemplate._id}`,
      );
      return updatedTemplate;
    } catch (error) {
      this.logger.error('Error updating resource template:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update resource template');
    }
  }

  async getResourceTemplateById(
    id: string,
  ): Promise<ResourceTemplateEntity | null> {
    try {
      return await this.resourceTemplateRepository.findOne({
        where: { _id: id },
      });
    } catch (error) {
      this.logger.error(`Error fetching resource template ${id}:`, error);
      return null;
    }
  }

  async getResourceTemplateByKey(
    key: string,
  ): Promise<ResourceTemplateEntity | null> {
    try {
      return await this.resourceTemplateRepository.findOne({
        where: { key },
      });
    } catch (error) {
      this.logger.error(
        `Error fetching resource template with key ${key}:`,
        error,
      );
      return null;
    }
  }

  async getAllResourceTemplates(): Promise<ResourceTemplateEntity[]> {
    try {
      return await this.resourceTemplateRepository.find();
    } catch (error) {
      this.logger.error('Error fetching all resource templates:', error);
      return [];
    }
  }

  async deleteResourceTemplate(id: string): Promise<boolean> {
    try {
      const result = await this.resourceTemplateRepository.delete({ _id: id });
      const deleted =
        typeof result.affected === 'number' && result.affected > 0;

      if (deleted) {
        this.logger.info(`Resource template deleted with ID: ${id}`);
      } else {
        this.logger.warn(`No resource template found to delete with ID: ${id}`);
      }

      return deleted;
    } catch (error) {
      this.logger.error(`Error deleting resource template ${id}:`, error);
      throw new BadRequestException('Failed to delete resource template');
    }
  }
}
