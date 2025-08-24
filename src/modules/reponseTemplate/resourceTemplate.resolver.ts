import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/libs/core/auth/guards/jwt-auth-guard';

import {
  CreateResourceTemplateInput,
  UpdateResourceTemplateInput,
} from './dtos/resourceTemplate.inputs';
import { GqlResourceTemplate } from './dtos/resourceTemplate.output';
import { ResourceTemplateService } from './resource-template.service';

@Resolver(() => GqlResourceTemplate)
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class ResourceTemplateResolver {
  constructor(
    private readonly resourceTemplateService: ResourceTemplateService,
  ) {}

  @Query(() => GqlResourceTemplate, { nullable: true })
  async resourceTemplate(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<GqlResourceTemplate | null> {
    const entity =
      await this.resourceTemplateService.getResourceTemplateById(id);
    return entity ? this.toGqlResourceTemplate(entity) : null;
  }

  @Query(() => GqlResourceTemplate, { nullable: true })
  async resourceTemplateByKey(
    @Args('key') key: string,
  ): Promise<GqlResourceTemplate | null> {
    const entity =
      await this.resourceTemplateService.getResourceTemplateByKey(key);
    return entity ? this.toGqlResourceTemplate(entity) : null;
  }

  @Query(() => [GqlResourceTemplate])
  async resourceTemplates(): Promise<GqlResourceTemplate[]> {
    const entities =
      await this.resourceTemplateService.getAllResourceTemplates();
    return entities.map(this.toGqlResourceTemplate);
  }

  @Mutation(() => GqlResourceTemplate)
  async createResourceTemplate(
    @Args('createResourceTemplateInput')
    createResourceTemplateInput: CreateResourceTemplateInput,
  ): Promise<GqlResourceTemplate> {
    const entity = await this.resourceTemplateService.createResourceTemplate(
      createResourceTemplateInput,
    );
    return this.toGqlResourceTemplate(entity);
  }

  @Mutation(() => GqlResourceTemplate)
  async updateResourceTemplate(
    @Args('updateResourceTemplateInput')
    updateResourceTemplateInput: UpdateResourceTemplateInput,
  ): Promise<GqlResourceTemplate> {
    const entity = await this.resourceTemplateService.updateResourceTemplate(
      updateResourceTemplateInput,
    );
    return this.toGqlResourceTemplate(entity);
  }

  @Mutation(() => Boolean)
  async deleteResourceTemplate(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return await this.resourceTemplateService.deleteResourceTemplate(id);
  }

  private toGqlResourceTemplate = (entity: any): GqlResourceTemplate => ({
    ...entity,
  });
}
