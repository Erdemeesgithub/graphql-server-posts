import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import MongoDBreq from "../utils/db";

const typeDefs = `#graphql
  type Post{
    text: String
    images: [String]
    userId: String
    createdAt: String
    _id: ID
  }
  type Query {
    getPosts : [Post]
    getPostDetail(id: ID!): Post
  }
  input PostInput {
    text: String
    images: [String]
  }

  type Mutation {
   createPost(postCreateInput: PostInput): String,
   updatePost(id: ID!,  postUpdateInput: PostInput): String,
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
    getPostDetail: async (_: any, args: any) => {
      const get: any = await MongoDBreq("findOne", {
        filter: { _id: { $oid: args.id } },
      });
      console.log(get.document);
      return get.document;
    },
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
    updatePost: async (_: any, args: any) => {
      const result = await MongoDBreq("updateOne", {
        filter: { _id: { $oid: args.id } },
        update: {
          $set: {
            text: args.postUpdateInput.text,
            images: args.postUpdateInput.images,
          },
        },
      });
      return result;
    },
    deletePost: async (_: any, args: any) => {
      const result = await MongoDBreq("deleteOne", {
        filter: { _id: { $oid: args.id } },
      });
      return "deleted";
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
