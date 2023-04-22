import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Requester {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;


}
