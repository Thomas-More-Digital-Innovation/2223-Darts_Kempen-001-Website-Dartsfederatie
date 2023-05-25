import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { PagesEnv } from "../env";
import { PostSubmission, postRegexPatterns } from "../../../modules/post";
import { Post } from "../../../types/posts";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const posts = await env.POSTS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
    });

    let postsMapped = posts.keys.map(async (posts) => {
      return JSON.parse(await env.POSTS.get(posts.name));
    });

    return new Response(JSON.stringify(await Promise.all(postsMapped)), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    const name = formData.get(PostSubmission.NAME);

    const postIdKey = `id:${Date.now()}`;

    let data: Post = changeData(postRegexPatterns, {}, formData) as Post;

    await env.POSTS.put(postIdKey, JSON.stringify(data));
    await searchKeyChecker(env.POSTS, postIdKey, `name:${name}`);

    return new Response(
      JSON.stringify({ message: "Post added successfully." }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const onRequestPut: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const formData = await request.formData();

    const params = getParams(request.url);

    const posts = await env.POSTS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each post using the form data
    const updates = posts.keys.map(async (post) => {
      const postData: Post = JSON.parse(await env.POSTS.get(post.name));

      const data: Post = changeData(
        postRegexPatterns,
        postData,
        formData
      ) as Post;

      // Update the team data in the KV store
      await env.POSTS.put(post.name, JSON.stringify(data));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "POsts updated successfully.",
      status: 200,
    };

    return new Response(JSON.stringify(responseBody), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorBody = {
      message: e instanceof Error ? e.message : "Internal server error.",
      status: e instanceof Error ? 500 : 400,
    };

    return new Response(JSON.stringify(errorBody), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
