import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateResourceTemplateInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  schema?: any;

  @Field(() => String, { nullable: true })
  @IsOptional()
  integrationId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  functionString?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  key?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  platforms?: any;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];
}

@InputType()
export class UpdateResourceTemplateInput {
  @Field(() => ID)
  @IsNotEmpty()
  _id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  schema?: any;

  @Field(() => String, { nullable: true })
  @IsOptional()
  integrationId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  functionString?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  key?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  platforms?: any;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];
}
