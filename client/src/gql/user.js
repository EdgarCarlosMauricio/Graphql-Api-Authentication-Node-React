import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation register($input: UserInput){
        register(input: $input) {
            id
            name
            username
            email
            password
            createAt
            updatedAt
        }
    }
`;


export const LOGIN = gql`
    mutation login($input: LoginInput){
        login(input: $input) {
            token
        }
    }
`;


export const GET_USER = gql`
    query getUser($id: ID, $username: String){
        getUser(id: $id, username: $username) {
            id
            name
            username
            email
            siteWeb
            description
            avatar
    }
}
`;

export const UPDATE_AVATAR = gql`
    mutation updateAvatar($file: Upload!) {
        updateAvatar(file: $file) {
            path
            id
            filename
            mimetype
            status
            urlAvatar
        }
    }
`;