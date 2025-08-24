import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GqlAction } from '../../action/dtos/action.outputs';
import { GqlResponse } from '../../response/dtos/response.outputs';
import { GqlTrigger } from '../../trigger/dtos/trigger.outputs';

@ObjectType('NodeObject')
export class GqlNodeObject {
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

  @Field(() => [ID], { nullable: true })
  parentIds?: string[];

  @Field(() => [GqlNodeObject], { nullable: true })
  parents?: GqlNodeObject[];

  @Field(() => Boolean, { nullable: true })
  root?: boolean;

  @Field(() => ID, { nullable: true })
  triggerId?: string;

  @Field(() => GqlTrigger, { nullable: true })
  trigger?: GqlTrigger;

  @Field(() => [ID], { nullable: true })
  responseIds?: string[];

  @Field(() => [GqlResponse], { nullable: true })
  responses?: GqlResponse[];

  @Field(() => [ID], { nullable: true })
  actionIds?: string[];

  @Field(() => [GqlAction], { nullable: true })
  actions?: GqlAction[];

  @Field(() => Number, { nullable: true })
  priority?: number;

  @Field(() => ID, { nullable: true })
  compositeId?: string;

  @Field(() => Boolean, { nullable: true })
  global?: boolean;

  @Field(() => String, { nullable: true })
  colour?: string;
}
