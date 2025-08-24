import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType('Trigger')
export class GqlTrigger {
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

  @Field(() => String, { nullable: true })
  functionString?: string;

  @Field(() => ID, { nullable: true })
  resourceTemplateId?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  params?: any;
}
