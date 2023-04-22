import { CreateRequesterInput } from './create-requester.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequesterInput extends PartialType(CreateRequesterInput) {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

}
