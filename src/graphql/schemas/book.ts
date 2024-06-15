import { SchemaInterface } from "./SchemaInterface";

export const bookSchema:SchemaInterface = {
    schemaDefinition: `
# This "Book" type defines the queryable fields for every book in our data source.
type Book {
    title: String
    author: String
  }
`,
schemaType: `books: [Book]`
};