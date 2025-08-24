import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/libs/core/auth/guards/jwt-auth-guard';

import { GqlResourceTemplate } from '../reponseTemplate/dtos/resourceTemplate.output';
import { ResourceTemplateService } from '../reponseTemplate/resource-template.service';
import { ActionService } from './action.service';
import { CreateActionInput, UpdateActionInput } from './dtos/action.inputs';
import { GqlAction } from './dtos/action.outputs';

@Resolver(() => GqlAction)
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class ActionResolver {
  constructor(
    private readonly actionService: ActionService,
    private readonly resourceTemplateService: ResourceTemplateService,
  ) {}

  @Query(() => GqlAction, { nullable: true })
  async action(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<GqlAction | null> {
    const entity = await this.actionService.getActionById(id);
    if (!entity) return null;
    return this.toGqlAction(entity);
  }

  @Query(() => [GqlAction])
  async actions(): Promise<GqlAction[]> {
    const entities = await this.actionService.getAllActions();
    return entities.map(this.toGqlAction);
  }

  @Mutation(() => GqlAction)
  async createAction(
    @Args('createActionInput') createActionInput: CreateActionInput,
  ): Promise<GqlAction> {
    const entity = await this.actionService.createAction(createActionInput);
    return this.toGqlAction(entity);
  }

  @Mutation(() => GqlAction)
  async updateAction(
    @Args('updateActionInput') updateActionInput: UpdateActionInput,
  ): Promise<GqlAction> {
    const entity = await this.actionService.updateAction(updateActionInput);
    return this.toGqlAction(entity);
  }

  @Mutation(() => Boolean)
  async deleteAction(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return await this.actionService.deleteAction(id);
  }

  @ResolveField('resourceTemplate', () => GqlResourceTemplate, {
    nullable: true,
  })
  async resourceTemplate(): Promise<GqlResourceTemplate | null> {
    // resourceTemplateId is not in GqlAction, so get from entity if needed
    // You may need to adjust this if you want to expose resourceTemplateId in GqlAction
    return null;
  }

  private toGqlAction = (entity: any): GqlAction => {
    return {
      _id: entity._id,
      name: entity.name,
      description: entity.description,
      platforms: entity.platforms || [],
    };
  };
}
