import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Post from "./post";
const CREATE_POST = gql`
  mutation CreatePost($postCreateInput: PostInput!) {
    createPost(postCreateInput: $postCreateInput)
  }
`;

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

export default function Home() {
  const { loading, error, data } = useQuery<{ getPosts: Post[] }>(GET_POSTS);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS],
  });

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [GET_POSTS],
  });
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [GET_POSTS],
  });
  const [text, setText] = useState();
  const [updatedText, setUpdatedText] = useState();
  console.log(data?.getPosts);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleUpdateChange = (event: any) => {
    setUpdatedText(event.target.value);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "purple",
          width: 200,
          color: "white",
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() =>
            createPost({
              variables: {
                postCreateInput: {
                  text: text,
                  images: [
                    "https://i.pinimg.com/originals/e0/d2/50/e0d250760f51ea71088985a6daa349e9.jpg",
                  ],
                },
              },
            })
          }
        >
          Add sample post
        </button>
        <input
          placeholder="insert text"
          style={{ width: 100, height: 30, border: "1px solid black" }}
          value={text}
          onChange={handleChange}
        />
      </div>
      <div>
        {data?.getPosts.map((post, i) => {
          return <Post text={post.text} id={post._id} />;
        })}
      </div>
    </>
  );
}
