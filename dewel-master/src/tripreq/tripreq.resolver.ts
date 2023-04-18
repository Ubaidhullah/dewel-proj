import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TripReqService } from './tripreq.service';
import { TripReq } from './entities/tripreq.entity';
import { CreateTripReqInput } from './dto/create-tripreq.input';
import { UpdateTripReqInput } from './dto/update-tripreq.input';

@Resolver(() => TripReq)
export class TripReqResolver {
  constructor(private readonly tripService: TripReqService) {}

  @Mutation(() => TripReq)
  createTripReq(
    @Args('createTripReqInput') createTripReqInput: CreateTripReqInput,
  ) {
    return this.tripService.create(createTripReqInput);
  }

  @Query(() => [TripReq], { name: 'tripreqs' })
  findAll() {
    return this.tripService.findAll();
  }

  @Query(() => TripReq, { name: 'tripreq' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tripService.findOne(id);
  }

  @Mutation(() => TripReq)
  updateTripReq(
    @Args('updateTripReqInput') updateTripReqInput: UpdateTripReqInput,
  ) {
    return this.tripService.update(updateTripReqInput.id, updateTripReqInput);
  }

  @Mutation(() => TripReq)
  removeTripReq(@Args('id', { type: () => Int }) id: number) {
    return this.tripService.remove(id);
  }
}
