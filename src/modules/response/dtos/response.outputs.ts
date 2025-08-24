import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType('ResponseVariation')
export class GqlResponseVariation {
  @Field(() => String)
  name: string;

  @Field(() => GraphQLJSONObject)
  responses: any;
}

@ObjectType('ResponseLocaleGroup')
export class GqlResponseLocaleGroup {
  @Field(() => ID, { nullable: true })
  localeGroupId?: string;

  @Field(() => [GqlResponseVariation])
  variations: GqlResponseVariation[];
}

@ObjectType('ResponsePlatform')
export class GqlResponsePlatform {
  @Field(() => ID, { nullable: true })
  integrationId?: string;

  @Field(() => Number, { nullable: true })
  build?: number;

  @Field(() => [GqlResponseLocaleGroup])
  localeGroups: GqlResponseLocaleGroup[];
}

@ObjectType('Response')
export class GqlResponse {
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

  @Field(() => [GqlResponsePlatform])
  platforms: GqlResponsePlatform[];
}
