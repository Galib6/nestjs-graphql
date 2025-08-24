import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType('ResourceTemplate')
export class GqlResourceTemplate {
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

  @Field(() => GraphQLJSONObject, { nullable: true })
  schema?: any;

  @Field(() => String, { nullable: true })
  integrationId?: string;

  @Field(() => String, { nullable: true })
  functionString?: string;

  @Field(() => String, { nullable: true })
  key?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  platforms?: any;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
