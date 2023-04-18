import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTripReqInput {
  @Field()
  requester: string;

  @Field()
  destination: string;

  @Field()
  departureDate: Date;

  @Field()
  returnDate: Date;
}
