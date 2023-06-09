import { CreateLocationInput } from './create-location.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {
  @Field(() => Int)
  id: number;

  @Field()
  island: string;

  @Field()
  description: string;
  
  @Field()
  distance: number;
}
