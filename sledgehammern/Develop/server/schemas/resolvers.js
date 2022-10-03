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
        }
    }
}