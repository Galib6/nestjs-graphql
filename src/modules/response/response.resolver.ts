import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/libs/core/auth/guards/jwt-auth-guard';

import {
  CreateResponseInput,
  UpdateResponseInput,
} from './dtos/response.inputs';
import { GqlResponse } from './dtos/response.outputs';
import { ResponseService } from './response.service';

@Resolver(() => GqlResponse)
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) {}

  @Query(() => GqlResponse, { nullable: true })
  async response(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<GqlResponse | null> {
    const entity = await this.responseService.getResponseById(id);
    return entity ? this.toGqlResponse(entity) : null;
  }

  @Query(() => [GqlResponse])
  async responses(): Promise<GqlResponse[]> {
    const entities = await this.responseService.getAllResponses();
    return entities.map(this.toGqlResponse);
  }

  @Mutation(() => GqlResponse)
  async createResponse(
    @Args('createResponseInput') createResponseInput: CreateResponseInput,
  ): Promise<GqlResponse> {
    const entity =
      await this.responseService.createResponse(createResponseInput);
    return this.toGqlResponse(entity);
  }

  @Mutation(() => GqlResponse)
  async updateResponse(
    @Args('updateResponseInput') updateResponseInput: UpdateResponseInput,
  ): Promise<GqlResponse> {
    const entity =
      await this.responseService.updateResponse(updateResponseInput);
    return this.toGqlResponse(entity);
  }

  @Mutation(() => Boolean)
  async deleteResponse(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return await this.responseService.deleteResponse(id);
  }

  private toGqlResponse = (entity: any): GqlResponse => ({
    ...entity,
  });
}
