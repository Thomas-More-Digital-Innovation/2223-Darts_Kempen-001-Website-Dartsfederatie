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

export const onRequestPut: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const formData = await request.formData();

    checkFields(formData, questionRegexPatterns, true);

    const params = getParams(request.url);

    const questions = await env.QUESTIONS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    const updates = questions.keys.map(async (question) => {
      const questionData: Question = JSON.parse(await env.QUESTIONS.get(question.name));

      const data: Question = (await changeData(
        questionRegexPatterns,
        questionData,
        formData
      )) as Question;

      await env.QUESTIONS.put(question.name, JSON.stringify(data));

      return data;
    });

    // Wait for all updates to complete
    let result = await Promise.all(updates);

    return new Response(JSON.stringify(result), {
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
