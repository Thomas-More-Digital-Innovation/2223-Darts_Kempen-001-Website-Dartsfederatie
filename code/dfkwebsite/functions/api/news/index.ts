import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { PagesEnv } from "../env";
import { NewsSubmission, newsRegexPatterns } from "../../../modules/news";
import { News } from "../../../types/general";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const news = await env.NEWS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
    });

    let newsMapped = news.keys.map(async (news) => {
      return JSON.parse(await env.MATCHES.get(news.name));
    });

    return new Response(JSON.stringify(await Promise.all(newsMapped)), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    const name = formData.get(NewsSubmission.TITLE);

    const newsIdKey = `id:${Date.now()}`;

    let data: News = await changeData(
      newsRegexPatterns,
      { newsID: newsIdKey },
      formData
    );

    await env.NEWS.put(newsIdKey, JSON.stringify(data));
    await searchKeyChecker(env.CLUBS, newsIdKey, `name:${name}`);

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
