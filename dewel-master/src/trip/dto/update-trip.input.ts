import { CreateTripInput } from './create-trip.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTripInput extends PartialType(CreateTripInput) {
  @Field(() => Int)
  id: number;

  @Field()
  requester: string;

  @Field()
  destination: string;

  @Field()
  departureDate: Date;

  @Field()
  returnDate: Date;

  @Field()
  estimatedBudget: number;

  @Field()
  estimatedDuration: number;

  @Field()
  estimatedTravelers: number;
}
