import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($email: String!, $username: String!, $age: String!, $gender: String!, $role: String!, $password: String!) {
    createUser(email: $email, username: $username, age: $age, gender: $gender, role: $role, password: $password) {
      id
      email
      username
      age
      gender
      role
    }
  }
`;


export const CREATE_VITAL_SIGNS = gql`
  mutation CreateVitalSigns(
    $nurseId: String!,
    $patientId: String!,
    $temperature: Float,
    $heartRate: Float,
    $bloodPressure: String,
    $respiratoryRate: Float,
    $notes: String
  ) {
    createVitalSigns(
      nurseId: $nurseId,
      patientId: $patientId,
      temperature: $temperature,
      heartRate: $heartRate,
      bloodPressure: $bloodPressure,
      respiratoryRate: $respiratoryRate,
      notes: $notes
    ) {
      id
      nurseId
      patientId
      temperature
      heartRate
      bloodPressure
      respiratoryRate
      updatedAt
      notes
    }
  }
`;


export const CREATE_DAILY_INFO = gql`
  mutation CreateDailyInfo(
    $patientId: String!,
    $pulseRate: Float,
    $bloodPressure: String,
    $weight: Float,
    $temperature: Float,
    $respiratoryRate: Float,
    $medicationTaken: Boolean
  ) {
    createDailyInfo(
      patientId: $patientId,
      pulseRate: $pulseRate,
      bloodPressure: $bloodPressure,
      weight: $weight,
      temperature: $temperature,
      respiratoryRate: $respiratoryRate,
      medicationTaken: $medicationTaken
    ) {
      id
      pulseRate
      bloodPressure
      weight
      temperature
      respiratoryRate
      updatedOn
      medicationTaken
    }
  }
`;

export const CREATE_SYMPTOMS = gql`
  mutation CreateSymptoms($patientId: String!, $symptomsList: [String!]!, $severity: String) {
    createSymptoms(patientId: $patientId, symptomsList: $symptomsList, severity: $severity) {
      id
      symptomsList
      severity
    }
  }
`;