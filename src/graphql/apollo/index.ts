// The ApolloServer constructor requires two parameters: your schema

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from "../schemas"
import {resolvers} from "../resolvers"

// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT || "4000") },
  }).then(({url}) => {
    console.log(`🚀  Server ready at: ${url}`);
  });