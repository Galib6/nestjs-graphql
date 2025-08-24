import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class ResponseVariationInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => GraphQLJSONObject)
  responses: any;
}

@InputType()
export class ResponseLocaleGroupInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  localeGroupId?: string;

  @Field(() => [ResponseVariationInput])
  @ValidateNested({ each: true })
  @Type(() => ResponseVariationInput)
  variations: ResponseVariationInput[];
}

@InputType()
export class ResponsePlatformInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  integrationId?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  build?: number;

  @Field(() => [ResponseLocaleGroupInput])
  @ValidateNested({ each: true })
  @Type(() => ResponseLocaleGroupInput)
  localeGroups: ResponseLocaleGroupInput[];
}

@InputType()
export class CreateResponseInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => [ResponsePlatformInput])
  @ValidateNested({ each: true })
  @Type(() => ResponsePlatformInput)
  platforms: ResponsePlatformInput[];
}

@InputType()
export class UpdateResponseInput {
  @Field(() => ID)
  @IsNotEmpty()
  _id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => [ResponsePlatformInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ResponsePlatformInput)
  platforms?: ResponsePlatformInput[];
}
