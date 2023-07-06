/* TODO: 
- `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.
- `ADD_USER` will execute the `addUser` mutation.
- `SAVE_BOOK` will execute the `saveBook` mutation.
- `REMOVE_BOOK` will execute the `removeBook` mutation.
*/
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
