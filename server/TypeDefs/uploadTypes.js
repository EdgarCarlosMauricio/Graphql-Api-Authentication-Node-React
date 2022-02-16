const {gql} = require("apollo-server-express");

module.exports = gql`
    type User {
        id: ID
        name: String
        username: String
        email: String
        siteWeb: String
        description: String
        password: String
        avatar: String
        createdAt: String
        updatedAt: String
    }
    type Token {
        token: String
    }

    type UpdateAvatar {
        status: Boolean
        urlAvatar: String
    }

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        siteWeb: String
        description: String
    }
    extend type Query {
        getUser(id: ID, username: String): User
        greetings: String
        search(search: String): [User]
    }
    extend type Mutation {
        register(input: UserInput): User
        login(input: LoginInput): Token
        updateAvatar(file: Upload!): UpdateAvatar
        deleteAvatar: Boolean
        updateUser(input: UserUpdateInput): Boolean
        singleUpload(file: Upload!): SuccessMessage
        multipleUpload(file: [Upload]!): SuccessMessage
    }
    type SuccessMessage {
        message: String
    }
`; 