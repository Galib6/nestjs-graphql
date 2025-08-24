import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/libs/core/auth/guards/jwt-auth-guard';

import { GqlAction } from '../action/dtos/action.outputs';
import { GqlResponse } from '../response/dtos/response.outputs';
import { GqlTrigger } from '../trigger/dtos/trigger.outputs';
import {
  CreateNodeObjectInput,
  UpdateNodeObjectInput,
} from './dtos/nodeObject.inputs';
import { GqlNodeObject } from './dtos/nodeObject.outputs';
import { NodeObjectService } from './nodeObject.service';

@Resolver(() => GqlNodeObject)
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class NodeObjectResolver {
  constructor(
    private readonly nodeObjectService: NodeObjectService,
    // Only keep nodeObjectService, remove missing services
  ) {}

  @Query(() => GqlNodeObject, { nullable: true, name: 'node' })
  async getNodeObject(
    @Args('nodeId', { type: () => ID }) nodeId: string,
  ): Promise<GqlNodeObject | null> {
    const entity = await this.nodeObjectService.getNodeObjectById(nodeId);
    return entity ? this.toGqlNodeObject(entity) : null;
  }

  @Query(() => [GqlNodeObject])
  async nodeObjects(): Promise<GqlNodeObject[]> {
    const entities = await this.nodeObjectService.getAllNodeObjects();
    return entities.map(this.toGqlNodeObject);
  }

  @Query(() => [GqlNodeObject])
  async rootNodes(): Promise<GqlNodeObject[]> {
    const entities = await this.nodeObjectService.getRootNodes();
    return entities.map(this.toGqlNodeObject);
  }

  @Mutation(() => GqlNodeObject)
  async createNodeObject(
    @Args('createNodeObjectInput') createNodeObjectInput: CreateNodeObjectInput,
  ): Promise<GqlNodeObject> {
    const entity = await this.nodeObjectService.createNodeObject(
      createNodeObjectInput,
    );
    return this.toGqlNodeObject(entity);
  }

  @Mutation(() => GqlNodeObject)
  async updateNodeObject(
    @Args('updateNodeObjectInput') updateNodeObjectInput: UpdateNodeObjectInput,
  ): Promise<GqlNodeObject> {
    const entity = await this.nodeObjectService.updateNodeObject(
      updateNodeObjectInput,
    );
    return this.toGqlNodeObject(entity);
  }

  @Mutation(() => Boolean)
  async deleteNodeObject(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return await this.nodeObjectService.deleteNodeObject(id);
  }

  // Field Resolvers
  @ResolveField('parents', () => [GqlNodeObject])
  async parents(@Parent() nodeObject: GqlNodeObject): Promise<GqlNodeObject[]> {
    if (!nodeObject.parentIds || nodeObject.parentIds.length === 0) {
      return [];
    }
    const entities = await this.nodeObjectService.getNodeObjectsByIds(
      nodeObject.parentIds,
    );
    return entities.map(this.toGqlNodeObject);
  }

  @ResolveField('trigger', () => GqlTrigger, { nullable: true })
  async trigger(
    @Parent() nodeObject: GqlNodeObject,
  ): Promise<GqlTrigger | null> {
    if (!nodeObject.triggerId) return null;
    const entity = await this.nodeObjectService.getTriggerById(
      nodeObject.triggerId,
    );
    return entity ? this.toGqlTrigger(entity) : null;
  }

  @ResolveField('responses', () => [GqlResponse], { nullable: true })
  async responses(@Parent() nodeObject: GqlNodeObject): Promise<GqlResponse[]> {
    if (!nodeObject.responseIds || nodeObject.responseIds.length === 0)
      return [];
    const entities = await this.nodeObjectService.getResponsesByIds(
      nodeObject.responseIds,
    );
    return entities.map(this.toGqlResponse);
  }

  @ResolveField('actions', () => [GqlAction], { nullable: true })
  async actions(@Parent() nodeObject: GqlNodeObject): Promise<GqlAction[]> {
    if (!nodeObject.actionIds || nodeObject.actionIds.length === 0) return [];
    const entities = await this.nodeObjectService.getActionsByIds(
      nodeObject.actionIds,
    );
    return entities.map(this.toGqlAction);
  }

  // Utility mapping functions
  toGqlNodeObject(entity: any): GqlNodeObject {
    return {
      ...entity,
      parents: entity.parents ? entity.parents.map(this.toGqlNodeObject) : [],
    };
  }
  toGqlTrigger(entity: any): GqlTrigger {
    return {
      ...entity,
    };
  }
  toGqlResponse(entity: any): GqlResponse {
    return {
      ...entity,
    };
  }
  toGqlAction(entity: any): GqlAction {
    return {
      ...entity,
    };
  }
}
