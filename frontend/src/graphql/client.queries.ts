
import { gql } from "@apollo/client";

import type{ IClient } from "../types/general";



export interface GetClientsResponse {
  getClients: {
    pagination:any
    data:IClient[]
  };
}

export interface GetClientsVars {
  userId: string;
  filter:any;
  pagination:any;
}

export const GET_CLIENTS = gql`
  query getClients($userId: ID!,$filter: ClientsFilter
    $pagination: PaginationFilter) {
    getClients(userId: $userId,filter: $filter
      pagination: $pagination) {
        pagination{
            page
            limit
            totalPages
            total
            skip
        }
      data{
        _id
      name
      nickname
      
      statics {
        students
        topics
        assignments
        sessions
        events
      }
      }
    }
  }
`;

export const GET_CLASSROOM = gql`
  query getClassroom($classroomId: ID!) {
    getClassroom(classroomId: $classroomId) {
      _id
      name
      color
      subject
      
      stats{
        students
        topics
        assignments
        sessions
        events
      }
    }
  }
`;


export interface GetClassroomResponse {
  getClassroom: IClient;
}

export interface GetClassroomVars {
  classroomId: string;
}
