/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAlinda = /* GraphQL */ `
  query GetAlinda($T_PK: String!, $T_SK: String!) {
    getAlinda(T_PK: $T_PK, T_SK: $T_SK) {
      T_PK
      T_SK
      X1_PK
      X2_PK
      X3_PK
      X4_PK
      X1_SK
      X2_SK
      X3_SK
      X4_SK
      date_first_login
      date_last_login
      isAdmin
      number_of_logins
      userEmail
      userName
      createdAt
      updatedAt
    }
  }
`;
export const listAlindas = /* GraphQL */ `
  query ListAlindas(
    $T_PK: String
    $T_SK: ModelStringKeyConditionInput
    $filter: ModelAlindaFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAlindas(
      T_PK: $T_PK
      T_SK: $T_SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        T_PK
        T_SK
        X1_PK
        X2_PK
        X3_PK
        X4_PK
        X1_SK
        X2_SK
        X3_SK
        X4_SK
        date_first_login
        date_last_login
        isAdmin
        number_of_logins
        userEmail
        userName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const qGSI_1 = /* GraphQL */ `
  query QGSI_1(
    $X1_PK: String!
    $X1_SK: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAlindaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    qGSI_1(
      X1_PK: $X1_PK
      X1_SK: $X1_SK
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        T_PK
        T_SK
        X1_PK
        X2_PK
        X3_PK
        X4_PK
        X1_SK
        X2_SK
        X3_SK
        X4_SK
        date_first_login
        date_last_login
        isAdmin
        number_of_logins
        userEmail
        userName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const qGSI_2 = /* GraphQL */ `
  query QGSI_2(
    $X2_PK: String!
    $X2_SK: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAlindaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    qGSI_2(
      X2_PK: $X2_PK
      X2_SK: $X2_SK
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        T_PK
        T_SK
        X1_PK
        X2_PK
        X3_PK
        X4_PK
        X1_SK
        X2_SK
        X3_SK
        X4_SK
        date_first_login
        date_last_login
        isAdmin
        number_of_logins
        userEmail
        userName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const qGSI_3 = /* GraphQL */ `
  query QGSI_3(
    $X3_PK: String!
    $X3_SK: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAlindaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    qGSI_3(
      X3_PK: $X3_PK
      X3_SK: $X3_SK
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        T_PK
        T_SK
        X1_PK
        X2_PK
        X3_PK
        X4_PK
        X1_SK
        X2_SK
        X3_SK
        X4_SK
        date_first_login
        date_last_login
        isAdmin
        number_of_logins
        userEmail
        userName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const qGSI_4 = /* GraphQL */ `
  query QGSI_4(
    $X4_PK: String!
    $X4_SK: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAlindaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    qGSI_4(
      X4_PK: $X4_PK
      X4_SK: $X4_SK
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        T_PK
        T_SK
        X1_PK
        X2_PK
        X3_PK
        X4_PK
        X1_SK
        X2_SK
        X3_SK
        X4_SK
        date_first_login
        date_last_login
        isAdmin
        number_of_logins
        userEmail
        userName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
