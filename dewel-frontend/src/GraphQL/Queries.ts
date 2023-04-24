import { gql } from "@apollo/client";

const GET_ALL_LOCATIONS = gql`
  query getLocations {
    locations {
      id
      island
      description
      distance
    }
  }
`;

const GET_ALL_REQUESTER = gql`
  query getLocations {
    locations {
      id
      name
      email
    }
  }
`;
const GET_ALL_TRIPS = gql`
  query getTrips {
    trips {
      id
      requester
      destination
      departureDate
      returnDate
      estimatedBudget
      estimatedDuration
      estimatedTravelers
    }
    locations {
      id
      island
      description
    }
  }
`;
const GET_ALL_TRIPS_REQ = gql`
  query getTripReqs {
    tripreqs {
      id
      requester
      destination
      departureDate
      returnDate
    }
    locations {
      id
      island
      description
    }
    requesters {
      id
      name
      email
    }
  }
`;


export { GET_ALL_LOCATIONS, GET_ALL_TRIPS, GET_ALL_TRIPS_REQ, GET_ALL_REQUESTER };
