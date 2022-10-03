const {AuthentificationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');
const {User, Book} = require ('../models');

const resolvers = {
    Query: {
        me: async (parent,context,args) => {
            if (context.user) {
                const userData = await User.findOne({_id:context.user._id})
                .select('-_v -password')
                return userData;
            }
            throw new AuthentificationError('Please log in');
        },
    },
    Mutation: {
        addUser:async(parent,args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login:async (parent,{email,password}) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthentificationError('Incorrect credentials')
            }
            const token = signToken(user);
            return {token, user };
        },
        saveBook: async (parent,{book}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedBooks:book }},
                    {new:true}
                )
                return updatedUser;
            }
            throw new AuthentificationError('Please log in')
        },
        removeBook: async (parent,{bookId},context) => {
            if (context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    {$pull: { savedBooks: { bookId:bookId}}},
                    {new:true}
                )
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;