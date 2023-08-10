import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input)
  }
`;
export default function Home() {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  console.log({ data, loading, error });

  return (
    <>
      <button
        onClick={() =>
          createPost({
            variables: {
              input: {
                text: "hello, world!",
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
    </>
  );
}
