const graphql = require('graphql')
const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema
} = graphql

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        data: {
            type: GraphQLString,
            resolve (parentValue, args){
                return 'Hello, GraphQL!'
            }
        }
    }
})

// const RootMutation

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
})