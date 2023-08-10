import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import MongoDBreq from "../utils/db";
import { log } from "console";

const typeDefs = `#graphql
  type Post{
    text: String
    images: [String]
    userId: String
    createdAt: String
  }
  type Query {
    getPosts : [Post]
    getPostDetail: Post
  }
  input PostInput {
    text: String
    images: [String]
  }

  type Mutation {
   createPost(postCreateInput: PostInput): String,
   updatePost(id: ID!, postUpdateInput: PostInput): Post,
   deletePost(id: ID!): ID
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      const get: any = await MongoDBreq("find", {});
      console.log(get);

      return get.documents;
    },
    getPostDetail: () => {},
  },
  Mutation: {
    createPost: async (
      _: never,
      args: { postCreateInput: { text: string; images: string[] } }
    ) => {
      const { text, images } = args.postCreateInput;
      const result: any = await MongoDBreq("insertOne", {
        document: {
          text,
          images,
        },
      });
      console.log({ result });
      return result.insertedId;
    },
    updatePost: () => {},
    deletePost: () => {},
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
