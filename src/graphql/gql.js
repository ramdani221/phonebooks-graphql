import { gql } from "@apollo/client";


export const GET_PHONEBOOKS = gql`
    query getPhonebooks ($page: Int, $limit: Int, $keyword: String, $sort: String) {
        getPhonebooks(page: $page, limit: $limit, keyword: $keyword, sort: $sort) {
            phonebooks {
              _id
              name
              phone
              avatar
            }
            page
            limit
            pages
            total
          }
    }
`

export const CREATE_PHONEBOOK = gql`
    mutation createPhonebook($input: PhonebookInput) {
        createPhonebook(input: $input) {
            _id
            name
            phone
            avatar
        }
    }
`

export const UPDATE_PHONEBOOK = gql`
    mutation updatePhonebook($_id: ID!, $input: PhonebookInput) {
        updatePhonebook(_id: $_id, input: $input) {
            _id
            name
            phone
            avatar
        }
    }
`

export const DELETE_PHONEBOOK = gql`
    mutation deletePhonebook($_id: ID!) {
        deletePhonebook(_id: $_id) {
            _id
            name
            phone
            avatar
        }
    }
`