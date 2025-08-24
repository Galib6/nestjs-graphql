import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TriggerInput {
  @Field()
  keyword: string;
}
