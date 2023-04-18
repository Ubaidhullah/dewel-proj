import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  island: string;

  @Field({ nullable: true })
  description: string;
}
