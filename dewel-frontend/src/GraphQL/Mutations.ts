import { gql } from "@apollo/client";

export const ADD_LOCATION = gql`
  mutation CreateLocation($island: String!, $description: String!, $distance: Float!) {
    createLocation(
      createLocationInput: { island: $island, description: $description , distance: $distance}
    ) {
      id
    }
  }
`;
export const UPDATE_LOCATION = gql`
  mutation UpdateLocation($id: Int!, $island: String!, $description: String!, $distance: Float!) {
    updateLocation(
      updateLocationInput: {
        id: $id
        island: $island
        description: $description
        distance: $distance
      }
    ) {
      id
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation RemoveLocation($id: Int!) {
    removeLocation(id: $id) {
      id
    }
  }
`;
export const ADD_TRIP = gql`
  mutation CreateTrip(
    $requester: String!
    $destination: String!
    $departureDate: DateTime!
    $returnDate: DateTime!
    $estimatedBudget: Float!
    $estimatedDuration: Float!
    $estimatedTravelers: Float!
  ) {
    createTrip(
      createTripInput: {
        requester: $requester
        destination: $destination
        departureDate: $departureDate
        returnDate: $returnDate
        estimatedBudget: $estimatedBudget
        estimatedDuration: $estimatedDuration
        estimatedTravelers: $estimatedTravelers
      }
    ) {
      id
    }
  }
`;
export const UPDATE_TRIP = gql`
  mutation UpdateTrip(
    $id: Int!
    $requester: String!
    $destination: String!
    $departureDate: DateTime!
    $returnDate: DateTime!
    $estimatedBudget: Float!
    $estimatedDuration: Float!
    $estimatedTravelers: Float!
  ) {
    updateTrip(
      updateTripInput: {
        id: $id
        requester: $requester
        destination: $destination
        departureDate: $departureDate
        returnDate: $returnDate
        estimatedBudget: $estimatedBudget
        estimatedDuration: $estimatedDuration
        estimatedTravelers: $estimatedTravelers
      }
    ) {
      id
    }
  }
`;
export const DELETE_TRIP = gql`
  mutation RemoveTrip($id: Int!) {
    removeTrip(id: $id) {
      id
    }
  }
`;
export const ADD_TRIP_REQ = gql`
  mutation CreateTripReq(
    $requester: String!
    $destination: String!
    $departureDate: DateTime!
    $returnDate: DateTime!
  ) {
    createTripReq(
      createTripReqInput: {
        requester: $requester
        destination: $destination
        departureDate: $departureDate
        returnDate: $returnDate
      }
    ) {
      id
    }
  }
`;
export const UPDATE_TRIP_REQ = gql`
  mutation UpdateTripReq(
    $id: Int!
    $requester: String!
    $destination: String!
    $departureDate: DateTime!
    $returnDate: DateTime!
  ) {
    updateTripReq(
      updateTripReqInput: {
        id: $id
        requester: $requester
        destination: $destination
        departureDate: $departureDate
        returnDate: $returnDate
      }
    ) {
      id
    }
  }
`;
export const DELETE_TRIP_REQ = gql`
  mutation RemoveTripReq($id: Int!) {
    removeTripReq(id: $id) {
      id
    }
  }
`;
