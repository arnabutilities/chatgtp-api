import { SchemaInterface } from "./SchemaInterface";

export const textRewritePrompterSchema:SchemaInterface = {
    schemaDefinition: `
# This "ChatGPT prompter" type defines the promptable parameters for every prompt in our data source.
type TextRewritePrompter {
    prompt: String
    response: String
    format: string
  }
`,
schemaType: `books: [Book]`
};