import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TripReq {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  requester: string;

  @Field({ nullable: true })
  destination: string;

  @Field()
  departureDate: Date;

  @Field()
  returnDate: Date;

}
