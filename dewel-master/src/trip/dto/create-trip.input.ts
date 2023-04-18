import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTripInput {
  
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
