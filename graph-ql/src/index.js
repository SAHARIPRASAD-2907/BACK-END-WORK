import { GraphQLServer } from "graphql-yoga";

//Types of scalar data
//5 scalar types in graph QL
// String, Boolean, Int, Float,ID

// Demo user Data
const users = [
  {
    id: "1",
    name: "Andrew",
    email: "andrew@gmail.com",
    age: 27,
  },
  {
    id: "2",
    name: "sarah",
    email: "sarah@gmail.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@gmail.com",
  },
];

//Type definitions schema (schema)
const typeDefs = `
    type Query{
        users:[User!]!
        me:User!
        post:Post!
    }

    type User{
        id: ID!,
        name:String!,
        email:String!,
        age:Int
    }

    type Post{
        id:ID!,
        body:String!,
        published:String!,
    }
`;

//Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      return users;
    },
    me() {
      return {
        id: "3257",
        name: "mike",
        email: "mike@gmail.com",
        age: 28,
      };
    },
    post() {
      return {
        id: "123",
        body: "myFirstpost",
        published: "29/07/21",
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up in 4000");
});
