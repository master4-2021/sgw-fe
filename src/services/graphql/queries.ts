import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
      position
      salary
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($name: String!, $position: String!, $salary: Int!) {
    createEmployee(name: $name, position: $position, salary: $salary) {
      id
      name
      position
      salary
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: String!
    $name: String
    $position: String
    $salary: Int
  ) {
    updateEmployee(id: $id, name: $name, position: $position, salary: $salary) {
      id
      name
      position
      salary
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: String!) {
    deleteEmployee(id: $id)
  }
`;
