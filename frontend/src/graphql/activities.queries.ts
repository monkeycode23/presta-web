
import { gql } from "@apollo/client";

import type { Session, Student, Activity } from '../types/general';

export interface GetActivitiesResponse {
  getSessionActivities: {
    pagination: any;
    data: {
        activities:Activity[];
        attendance:any[]
    }
  };
}

export interface GetActivitiesVars {
  sessionId: string;
}


export const GET_ACTIVITIES = gql`
  query getSessionActivities($sessionId: ID!) {
    getSessionActivities(sessionId: $sessionId) {
        pagination{
            total
            page
            limit
            totalPages
        }
      data {
        activities{
            _id
        title
        description
        completed
        type
        order
        progress

        }
        
      }
    }
  }
`;

