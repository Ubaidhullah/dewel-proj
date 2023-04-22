import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequesterInput {
  @Field()
  name: string;

  @Field()
  email: string;

}
