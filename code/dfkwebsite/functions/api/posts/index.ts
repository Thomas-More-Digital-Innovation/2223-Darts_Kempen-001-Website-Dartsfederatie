import { checkFields } from "../../../modules/fieldsCheck";
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

    const postIdKey = `id:${Date.now()}`;

    let data: Post = await changeData(
      postRegexPatterns,
      { postID: postIdKey },
      formData
    );

    await env.POSTS.put(postIdKey, JSON.stringify(data));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
