const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }

    type User {
        _id: ID
        Username: String
        email: String
        bookCount:Int
        savedBooks:[Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book:SavedBook): User
        removeBook(bookId: String!): User
    }

    type Book{
        _id:ID
        bookId:String
        authors:[String]
        description: String
        title: String
        image: String
        forSale: String
        link: String
    }
    input SavedBook {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        forSale: String
        link: String

    }
`;

module.exports = typeDefs;