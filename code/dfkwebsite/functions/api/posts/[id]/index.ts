import { checkFields } from "../../../../modules/fieldsCheck";
import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import { PostSubmission, postRegexPatterns } from "../../../../modules/post";
import { Post } from "../../../../types/posts";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const postId = params.id.toString();
    const post: Post = JSON.parse(
      await getRecordByIdOrError(postId, env.POSTS)
    );

    return new Response(JSON.stringify(post), {
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

export const onRequestPut: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const formData = await request.formData();

    const postId = params.id.toString();
    const post: Post = JSON.parse(
      await getRecordByIdOrError(postId, env.POSTS)
    );

    const data: Post = (await changeData(
      postRegexPatterns,
      { ...post, dateChanged: Date.now() },
      formData
    )) as Post;

    // Update the post data in the KV store
    await env.POSTS.put(postId, JSON.stringify(data));

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const onRequestDelete: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const postId = params.id.toString();
    const post: Post = JSON.parse(
      await getRecordByIdOrError(postId, env.POSTS)
    );

    //Post is already deleted
    if (post.deleted) {
      return new Response(JSON.stringify(post));
    }

    const data: Post = { ...post, deleted: true, dateModified: Date.now() };

    // Update the post data in the KV store
    await env.POSTS.put(postId, JSON.stringify(data));

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
