import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GqlResourceTemplate } from '../../reponseTemplate/dtos/resourceTemplate.output';

@ObjectType('ActionPlatform')
export class GqlActionPlatform {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  status?: string;
}

@ObjectType('Action')
export class GqlAction {
  @Field(() => GqlResourceTemplate, {
    nullable: true,
  })
  resourceTemplate?: GqlResourceTemplate;
  @Field(() => ID)
  _id: string;

  // @Field(() => GraphQLLong)
  // createdAt: number;

  // @Field(() => GraphQLLong, { nullable: true })
  // updatedAt?: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [GqlActionPlatform])
  platforms: GqlActionPlatform[];
}
