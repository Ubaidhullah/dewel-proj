import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Trip {
  @Field(() => Int)
  id: number;

  @Field()
  requester: string;

  @Field({ nullable: true })
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
