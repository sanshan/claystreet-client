import {gql} from '@apollo/client/core';

export const GET_DATASETS = gql`
  query GetDataSets {
    datasets @client
  }
`;

export const GET_CURRENT_DATASET = gql`
  query GetCurrentDataSet {
    current @client
  }
`;
