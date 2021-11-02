import { GraphQLServer } from 'graphql-yoga';

//Types of scalar data
//5 scalar types in graph QL
// String, Boolean, Int, Float,ID

//Type definitions schema (schema)
const typeDefs = `
    type Query{
        title:String!,
        price:Float!,
        releaseYear:Int,
        rating:Float,
        inStock:Boolean!
    }
`

//Resolvers
const resolvers = {
    Query: {
        title() {
            return "Maths Book"
        },
        price() {
            return 22.5
        },
        releaseYear() {
            return 2021
        },
        rating() {
            return 4.2
        },
        inStock() {
            return 3.5;
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

