import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_POSTS = gql`
  query Query {
    getPosts {
      text
      images
      _id
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($updatePostId: ID!, $postUpdateInput: PostInput) {
    updatePost(id: $updatePostId, postUpdateInput: $postUpdateInput)
  }
`;

interface Post {
  text: string;
  _id: string;
  images: string;
}

export default function Post({ text, id }) {
  const { loading, error, data } = useQuery<{ getPosts: Post[] }>(GET_POSTS);
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [GET_POSTS],
  });
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [GET_POSTS],
  });
  const [textt, setTextt] = useState();
  const [updatedText, setUpdatedText] = useState();
  console.log(data?.getPosts);

  const handleChange = (event: any) => {
    setTextt(event.target.value);
  };

  const handleUpdateChange = (event: any) => {
    setUpdatedText(event.target.value);
  };
  console.log(data?.getPosts);
  return (
    <div
      style={{
        backgroundColor: "pink",
        border: "1px solid black",
        width: 250,
        height: 80,
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <div>{text}</div>
        </div>
        <button
          style={{
            border: "1px solid black",
            height: 40,
            width: 40,
            backgroundColor: "gray",
            padding: 10,
          }}
          onClick={() =>
            deletePost({
              variables: {
                deletePostId: id,
              },
            })
          }
        >
          X
        </button>
      </div>
      <button
        style={{
          border: "2px solid black",
          height: 40,
          width: 70,
          backgroundColor: "gray",
          padding: 10,
        }}
        onClick={() =>
          updatePost({
            variables: {
              updatePostId: id,
              postUpdateInput: {
                text: updatedText,
              },
            },
          })
        }
      >
        update
      </button>
      <input
        type="text"
        placeholder="update text"
        style={{ width: 100, height: 30, border: "1px solid black" }}
        value={updatedText}
        onChange={handleUpdateChange}
      />
    </div>
  );
}
