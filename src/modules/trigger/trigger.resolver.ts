import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/libs/core/auth/guards/jwt-auth-guard';
import { TriggerInput } from './dtos/trigger.inputs';
import { GqlTrigger } from './dtos/trigger.outputs';
import { TriggerService } from './trigger.service';

@Resolver(() => GqlTrigger)
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class TriggerResolver {
  private toGqlTrigger(entity: any): GqlTrigger {
    return {
      _id: entity._id,
      // createdAt:
      //   entity.createdAt instanceof Date
      //     ? entity.createdAt.getTime()
      //     : typeof entity.createdAt === 'number'
      //       ? entity.createdAt
      //       : 0,
      // updatedAt:
      //   entity.updatedAt instanceof Date
      //     ? entity.updatedAt.getTime()
      //     : typeof entity.updatedAt === 'number'
      //       ? entity.updatedAt
      //       : undefined,
      name: entity.name,
      description: entity.description,
      functionString: entity.functionString,
      resourceTemplateId: entity.resourceTemplateId,
      params: entity.params,
    };
  }
  constructor(private readonly triggerService: TriggerService) {}

  @Query(() => [GqlTrigger])
  async triggers(): Promise<GqlTrigger[]> {
    const entities = await this.triggerService.getAllTriggers();
    return entities.map(this.toGqlTrigger);
  }

  @Query(() => GqlTrigger, { nullable: true })
  async trigger(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<GqlTrigger | null> {
    const entity = await this.triggerService.getTriggerById(id);
    return entity ? this.toGqlTrigger(entity) : null;
  }

  @Mutation(() => GqlTrigger)
  async createTrigger(@Args('input') input: TriggerInput): Promise<GqlTrigger> {
    const entity = await this.triggerService.createTrigger(input);
    return this.toGqlTrigger(entity);
  }

  @Mutation(() => GqlTrigger)
  async updateTrigger(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: TriggerInput,
  ): Promise<GqlTrigger> {
    const entity = await this.triggerService.updateTrigger(id, input);
    return this.toGqlTrigger(entity);
  }

  @Mutation(() => Boolean)
  async deleteTrigger(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return await this.triggerService.deleteTrigger(id);
  }
}
