import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateActionInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  functionString?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  resourceTemplateId?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  params?: any;
}

@InputType()
export class UpdateActionInput {
  @Field(() => ID)
  @IsNotEmpty()
  _id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  functionString?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  resourceTemplateId?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  params?: any;
}
