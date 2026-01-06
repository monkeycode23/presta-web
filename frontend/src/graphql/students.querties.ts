import { gql } from "@apollo/client";
import { Student } from "../types/general";


export interface GetStudentResponse {
  getClassroomStudents: {
    pagination:any,
    data:Student[]
  };
}

export interface GetStudentVars {
  classroomId: string;
}

export const GET_STUDENTS = gql`
  query getClassroomStudents($classroomId: ID!) {
    getClassroomStudents(classroomId: $classroomId) {
      pagination{
        total
        totalPages
      }
      data{
        _id
          names
          lastname
          email
          average
      }
    }
  }
`;
