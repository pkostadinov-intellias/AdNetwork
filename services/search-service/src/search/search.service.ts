import { typesenseClient } from "../config/typesense/typesense";

export const searchAllService = async (query: string) => {
  const [userSearch, postSearch] = await Promise.all([
    typesenseClient.collections("users").documents().search({
      q: query,
      query_by: "username,fullName"
    }),
    typesenseClient.collections("posts").documents().search({
      q: query,
      query_by: "content"
    })
  ]);

  return {
    users: userSearch.hits?.map((hit) => hit.document),
    posts: postSearch.hits?.map((hit) => hit.document)
  };
};
