import { GraphQLServer } from 'graphql-yoga';

//Types of scalar data
//5 scalar types in graph QL
// String, Boolean, Int, Float,ID

//Type definitions schema (schema)
const typeDefs = `
    type Query{
        id: ID!
        name: String!
        age:Int!
        employed:Boolean!
        gpa:Float
        rating:float
    }
`

//Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return "Hari"
        },
        age() {
            return 22
        },
        employed() {
            return true
        },
        gpa() {
            return 8.66
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("The server is up");
})

