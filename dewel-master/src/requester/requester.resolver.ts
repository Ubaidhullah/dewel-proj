import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequesterService } from './requester.service';
import { Requester } from './entities/requester.entity';
import { CreateRequesterInput } from './dto/create-requester.input';
import { UpdateRequesterInput } from './dto/update-requester.input';

@Resolver(() => Requester)
export class RequesterResolver {
  constructor(private readonly requesterService: RequesterService) {}

  @Mutation(() => Requester)
  createRequester(@Args('createRequesterInput') createRequesterInput: CreateRequesterInput) {
    return this.requesterService.create(createRequesterInput);
  }

  @Query(() => [Requester], { name: 'requester' })
  findAll() {
    return this.requesterService.findAll();
  }

  @Query(() => Requester, { name: 'requester' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.requesterService.findOne(id);
  }

  @Mutation(() => Requester)
  updateRequester(@Args('updateRequesterInput') updateRequesterInput: UpdateRequesterInput) {
    return this.requesterService.update(updateRequesterInput.id, updateRequesterInput);
  }

  @Mutation(() => Requester)
  removeRequester(@Args('id', { type: () => Int }) id: number) {
    return this.requesterService.remove(id);
  }
}
