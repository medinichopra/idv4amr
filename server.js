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