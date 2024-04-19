
import { useQuery, gql } from '@apollo/client';


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

// GET_SYMPTOMS_HISTORY Query


export const GET_SYMPTOMS_HISTORY = gql`
  query GetSymptomsHistory($patientId: String!) {
    getSymptomsHistory(patientId: $patientId) {
      id
      symptomsList
      createdAt
      severity
    }
  }
`;


// GET_DAILY_INFO_HISTORY Query
export const GET_DAILY_INFO_HISTORY = gql`
query GetDailyInfoHistory($patientId: String!) {
    getDailyInfoHistory(patientId: $patientId) {
        id
        pulseRate
        bloodPressure
        weight
        temperature
        respiratoryRate
        updatedOn
        medicationTaken
    }
}`;
