import { checkFields } from "../../../../modules/fieldsCheck";
import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import { Question } from "../../../../types/general";
import { PagesEnv } from "../../env";
import { questionRegexPatterns } from "../../../../modules/question";

export const onRequestPut: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const formData = await request.formData();

    checkFields(formData, questionRegexPatterns, true);

    const questionId = params.id.toString();
    const question = await getRecordByIdOrError(questionId, env.QUESTIONS);

    const questionData: Question = JSON.parse(question);

    const data: Question = (await changeData(
      questionRegexPatterns,
      questionData,
      formData
    )) as Question;

    await env.QUESTIONS.put(questionId, JSON.stringify(data));

    const responseBody = data;

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

export const onRequestDelete: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const questiontId = params.id.toString();
    const question = await getRecordByIdOrError(questiontId, env.QUESTIONS);

    const questionData: Question = JSON.parse(question);

    const data: Question = {
      ...questionData,
    };

    await env.QUESTIONS.put(questiontId, JSON.stringify(data));

    const responseBody = {
      message: "Question deleted successfully.",
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
