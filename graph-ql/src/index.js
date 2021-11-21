import { GraphQLServer } from "graphql-yoga";

//Types of scalar data
//5 scalar types in graph QL
// String, Boolean, Int, Float,ID

//Type definitions schema (schema)
const typeDefs = `
    type Query{
        greeting(name: String,position:String):String!
        add(numbers: [Float!]!):Float!
        grades:[Int!]!
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
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    greeting(parent, args, ctx, info) {
      //console.log(parent);
      console.log(args);
      //console.log(ctx);
      //console.log(info);
      if (args.name && args.position) {
        return `Hello , ${args.name} you are my favorite ${args.position}`;
      } else {
        return "Hello!";
      }
    },
    grades(parent, args, ctx, info) {
      return [99, 83, 71];
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
