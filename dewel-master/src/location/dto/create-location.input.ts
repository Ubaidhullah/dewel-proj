import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  island: string;

  @Field()
  description: string;

  @Field()
  distance: number;
}
