import fetch from "node-fetch";

export default async function handler(action: any, options: any) {
  const result = await fetch(
    `https://ap-southeast-1.aws.data.mongodb-api.com/app/data-omhrb/endpoint/data/v1/action/${action}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "mVcN9HasgaooVobGpj00LceziEjclyMbox0EpZkKFlwqDPW5KGtaMv6b1wUlmV2y",
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "postDb",
        collection: "posts",
        ...options,
      }),
    }
  ).then((res) => res.json());

  return result;
}
