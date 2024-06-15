// Resolvers define how to fetch the types defined in your schema.

import { books } from "../datasouce/static/index.js";

// This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
      books: () => books,
    },
  };