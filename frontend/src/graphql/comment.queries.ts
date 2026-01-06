
import { gql } from "@apollo/client";

import {  Topic } from "../types/general";



export const GET_COMMENTS = gql`
  query getTopicComments($topicId: ID!) {
    getTopicComments(topicId: $topicId) {
      _id
      content
      
      stats{
        replies   
        }
    }
  }
`;


export interface GetCommentsResponse {
  getTopicComments: Topic[];
}

export interface GetCommentsVars {
  topicId: string;
}
