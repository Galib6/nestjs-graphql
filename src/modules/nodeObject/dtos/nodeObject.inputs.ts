import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateNodeObjectInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  parentIds?: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  root?: boolean;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  triggerId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  responseIds?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  actionIds?: string[];

  @Field(() => Number, { nullable: true })
  @IsOptional()
  priority?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  compositeId?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  global?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  colour?: string;
}

@InputType()
export class UpdateNodeObjectInput {
  @Field(() => ID)
  @IsNotEmpty()
  _id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  parentIds?: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  root?: boolean;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  triggerId?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  responseIds?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  actionIds?: string[];

  @Field(() => Number, { nullable: true })
  @IsOptional()
  priority?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  compositeId?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  global?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  colour?: string;
}
