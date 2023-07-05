import { checkFields } from "../../../modules/fieldsCheck";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { QuestionSubmission, questionRegexPatterns } from "../../../modules/question";
import { Question } from "../../../types/general";
import { PagesEnv } from "../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const questions = await env.QUESTIONS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
    });

    let questionsMapped = questions.keys.map(async (question) => {
      return JSON.parse(await env.QUESTIONS.get(question.name));
    });

    return new Response(JSON.stringify(await Promise.all(questionsMapped)), {
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

    const name = formData.get(QuestionSubmission.QUESTION);

    const questionIdKey = `id:${Date.now()}`;

    let data: Question = await changeData(
      questionRegexPatterns,
      { questionID: questionIdKey },
      formData
    );

    await env.QUESTIONS.put(questionIdKey, JSON.stringify(data));
    await searchKeyChecker(env.QUESTIONS, questionIdKey, `name:${name}`);

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
