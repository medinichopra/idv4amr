const express = require('express')
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
// const { buildSchema } = require('graphql');

const app = express()

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {},
    // graphql: true
}))

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})

const mongoose = require('mongoose')

mongoose
    .connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0-yhukr.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`)
    .then( () => {
        app.listen({ port: 3000 }, () => {
            console.log('Your Apollo Server is running on port 3000')
        })
    })
    .error( () => {
        console.error('Error while connecting to MongoDB');
    })