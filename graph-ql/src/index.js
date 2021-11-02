import { GraphQLServer } from 'graphql-yoga';

//Type definitions schema (schema)
const typeDefs = `
    type Query{
        hello: String!
        myName: String!
        location: String!
        bio:String!
    }
`

//Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        myName(){
            return "My name is hari"
        },
        location() {
            return "I am living in chennai"
        },
        bio() {
            return "I am a web developer and data scientist"
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

