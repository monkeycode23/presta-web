import { gql } from "@apollo/client";
import { Material, Student } from "../types/general";


export interface GetResourcceResponse {
  getTopicResources: {
    pagination:any,
    data:Material[]
  };
}

export interface GetResoucesVars {
  topicId: string;
}

export const GET_RESOURCES = gql`
  query getTopicResources($topicId: ID!) {
    getTopicResources(topicId: $topicId) {
      pagination{
        total
        totalPages
      }
      data{
        _id
        type
        url
        title
      }
    }
  }
`;
