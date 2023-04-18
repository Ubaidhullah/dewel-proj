import { CreateTripReqInput } from './create-tripreq.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTripReqInput extends PartialType(CreateTripReqInput) {
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
}
