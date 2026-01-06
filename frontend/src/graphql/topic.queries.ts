

import { gql } from "@apollo/client";
import { Topic } from "../types/general";

export const GET_TOPICS = gql`
  query getClassroomTopics($filters: TopicsFilter) {
    getClassroomTopics(filters:$filters) {
      pagination{
        page
        total 
        totalPages
        limit 
      }

      data{
        _id
      title
      status
      description
      progress
      concepts{
        title
        checked
      }
      stats{
        resources
        comments
        quizzes
        concepts
      }
      }
    }
  }
`;



export  interface GetTopicsResponse {
  getClassroomTopics:{
    pagination:any
    data: Topic[]
  };
}

export interface GetTopicsVars {
  filters:{
    classroomId: string;
    status:string[]
  pagination?:any
  }
}

