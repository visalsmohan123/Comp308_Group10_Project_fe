import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      username
      role
    }
  }
`;

export const GET_USERS_BY_ROLE = gql`
  query GetUsersByRole($role: String!) {
    getUsersByRole(role: $role) {
      id
      username
      email
      role
    }
  }
`;

export const GET_HISTORY_BY_PATIENT = gql`
query GetPreviousVitalSigns($patientId: String!) {
  getPreviousVitalSigns(patientId: $patientId) {
    nurseId
    patientId
    temperature
    heartRate
    bloodPressure
    respiratoryRate
    updatedAt
    notes
  }
}`;
