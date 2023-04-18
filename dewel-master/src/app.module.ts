import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { TripModule } from './trip/trip.module';
import { TripReqModule } from './tripreq/tripreq.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: false,
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TripModule,
    LocationModule,
    TripReqModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
