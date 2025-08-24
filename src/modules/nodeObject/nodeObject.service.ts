import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { In, Repository } from 'typeorm';

import { NodeObjectEntity } from '../../libs/db/entities/nodeObject.entity';
import {
  CreateNodeObjectInput,
  UpdateNodeObjectInput,
} from './dtos/nodeObject.inputs';

@Injectable()
export class NodeObjectService {
  async getTriggerById(triggerId: string) {
    if (!triggerId) return null;
    // Assuming TriggerEntity is imported and repository is available
    // You may need to inject TriggerRepository if not already
    // For now, use nodeObjectRepository to find node with trigger
    const node = await this.nodeObjectRepository.findOne({
      where: { triggerId },
      relations: ['trigger'],
    });
    return node?.trigger || null;
  }

  async getResponsesByIds(responseIds: string[]) {
    if (!responseIds || responseIds.length === 0) return [];
    // Assuming ResponseEntity is imported and repository is available
    // For now, use nodeObjectRepository to find nodes with responses
    // You may want to inject ResponseRepository for more direct access
    const nodes = await this.nodeObjectRepository.find({
      where: {},
      relations: ['responses'],
    });
    // Flatten and filter responses by ID
    const allResponses = nodes.flatMap(n => n.responses || []);
    return allResponses.filter(r => responseIds.includes(r._id));
  }

  async getActionsByIds(actionIds: string[]) {
    if (!actionIds || actionIds.length === 0) return [];
    // Assuming ActionEntity is imported and repository is available
    // For now, use nodeObjectRepository to find nodes with actions
    // You may want to inject ActionRepository for more direct access
    const nodes = await this.nodeObjectRepository.find({
      where: {},
      relations: ['actions'],
    });
    // Flatten and filter actions by ID
    const allActions = nodes.flatMap(n => n.actions || []);
    return allActions.filter(a => actionIds.includes(a._id));
  }
  constructor(
    private logger: PinoLogger,
    @InjectRepository(NodeObjectEntity)
    private nodeObjectRepository: Repository<NodeObjectEntity>,
  ) {}

  async createNodeObject(
    input: CreateNodeObjectInput,
  ): Promise<NodeObjectEntity> {
    try {
      const nodeObject = this.nodeObjectRepository.create({
        ...input,
      });
      // Handle relationships if needed
      if (input.parentIds && input.parentIds.length > 0) {
        const parents = await this.nodeObjectRepository.findBy({
          _id: In(input.parentIds),
        });
        nodeObject.parents = parents;
      }
      const savedNode = await this.nodeObjectRepository.save(nodeObject);
      this.logger.info(`Node object created with ID: ${savedNode._id}`);
      return savedNode;
    } catch (error) {
      this.logger.error('Error creating node object:', error);
      throw new BadRequestException('Failed to create node object');
    }
  }

  async updateNodeObject(
    input: UpdateNodeObjectInput,
  ): Promise<NodeObjectEntity> {
    try {
      const { _id, ...updateData } = input;

      const existingNode = await this.nodeObjectRepository.findOne({
        where: { _id },
        relations: ['parents'],
      });

      if (!existingNode) {
        throw new NotFoundException(`Node object with ID ${_id} not found`);
      }

      // Handle parent relationships if updated
      if (updateData.parentIds !== undefined) {
        if (updateData.parentIds && updateData.parentIds.length > 0) {
          const parents = await this.nodeObjectRepository.findBy({
            _id: In(updateData.parentIds),
          });
          existingNode.parents = parents;
        } else {
          existingNode.parents = [];
        }
      }

      // Update other fields
      Object.assign(existingNode, updateData);

      const updatedNode = await this.nodeObjectRepository.save(existingNode);
      this.logger.info(`Node object updated with ID: ${updatedNode._id}`);
      return updatedNode;
    } catch (error) {
      this.logger.error('Error updating node object:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update node object');
    }
  }

  async getNodeObjectById(id: string): Promise<NodeObjectEntity | null> {
    try {
      return await this.nodeObjectRepository.findOne({
        where: { _id: id },
        relations: ['parents', 'trigger', 'responses', 'actions'],
      });
    } catch (error) {
      this.logger.error(`Error fetching node object ${id}:`, error);
      return null;
    }
  }

  async getNodeObjectsByIds(ids: string[]): Promise<NodeObjectEntity[]> {
    if (!ids || ids.length === 0) return [];

    try {
      return await this.nodeObjectRepository.findBy({
        _id: In(ids),
      });
    } catch (error) {
      this.logger.error('Error fetching node objects by IDs:', error);
      return [];
    }
  }

  async getAllNodeObjects(): Promise<NodeObjectEntity[]> {
    try {
      return await this.nodeObjectRepository.find({
        relations: ['parents', 'trigger', 'responses', 'actions'],
      });
    } catch (error) {
      this.logger.error('Error fetching all node objects:', error);
      return [];
    }
  }

  async getRootNodes(): Promise<NodeObjectEntity[]> {
    try {
      return await this.nodeObjectRepository.find({
        where: { root: true },
        relations: ['parents', 'trigger', 'responses', 'actions'],
      });
    } catch (error) {
      this.logger.error('Error fetching root nodes:', error);
      return [];
    }
  }

  async deleteNodeObject(id: string): Promise<boolean> {
    try {
      const result = await this.nodeObjectRepository.delete({ _id: id });
      const deleted =
        typeof result.affected === 'number' && result.affected > 0;

      if (deleted) {
        this.logger.info(`Node object deleted with ID: ${id}`);
      } else {
        this.logger.warn(`No node object found to delete with ID: ${id}`);
      }

      return deleted;
    } catch (error) {
      this.logger.error(`Error deleting node object ${id}:`, error);
      throw new BadRequestException('Failed to delete node object');
    }
  }
}
