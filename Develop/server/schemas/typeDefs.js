const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    type User {
        _id: ID
        Username: String
        email: String
        bookCount:Int
        savedBooks:[Book]
    }

`