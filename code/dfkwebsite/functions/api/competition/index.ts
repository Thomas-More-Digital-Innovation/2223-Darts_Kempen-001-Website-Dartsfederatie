import { v4 as uuidv4 } from "uuid";
import { PagesEnv } from "../env";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { checkFields } from "../../../modules/fieldsCheck";
import {
  CompetitionSubmission,
  competitionRegexPatterns,
} from "../../../modules/competition";
import {
  CLASSIFICATION,
  COMPETITION_TYPE,
  Competition,
  CompetitionFront,
  CompetitionPartial,
} from "../../../types/competition";
import { clubRegexPatterns } from "../../../modules/club";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const competitions = await env.COMPETITION.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
    });

    let competitionsMapped: Promise<CompetitionFront>[] = competitions.keys.map(
      async (competition) => {
        let competitionData: Competition = JSON.parse(
          await env.COMPETITION.get(competition.name)
        );
        let competitionPartials = competitionData.competitionIDs.map(
          async (classification) =>
            JSON.parse(
              await env.COMPETITION.get(classification)
            ) as CompetitionPartial
        );

        return {
          ...competitionData,
          competitions: await Promise.all(competitionPartials),
        };
      }
    );

    return new Response(JSON.stringify(await Promise.all(competitionsMapped)), {
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

    // ID will be random, uuidv4() generates a random UUID
    const competitionIdKey = `id:${new Date().getTime()}`;

    let data: Competition = await changeData(
      competitionRegexPatterns,
      {
        competitionID: competitionIdKey,
      },
      formData
    );

    let partialIDs = data.classification.map(async (classification) => {
      const competitionClassificationIdKey = `classification:${competitionIdKey}:${classification}`;

      let classificationData: CompetitionPartial = {
        competitionPartialID: competitionClassificationIdKey,
        competitionID: competitionIdKey,
        classification: classification,
      };

      await env.COMPETITION.put(
        competitionClassificationIdKey,
        JSON.stringify(classificationData)
      );

      return classificationData.competitionPartialID;
    });

    data = { ...data, competitionIDs: await Promise.all(partialIDs) };

    await env.COMPETITION.put(competitionIdKey, JSON.stringify(data));

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

    checkFields(formData, competitionRegexPatterns, true);

    const params = getParams(request.url);

    const competitions = await env.COMPETITION.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each competition using the form data
    const updates = competitions.keys.map(async (competition) => {
      const competitionData: Competition = JSON.parse(
        await env.COMPETITION.get(competition.name)
      );

      const data: Competition = (await changeData(
        clubRegexPatterns,
        competitionData,
        formData
      )) as Competition;

      // Update the competition data in the KV store
      await env.COMPETITION.put(competition.name, JSON.stringify(data));

      return data;
    });

    // Wait for all updates to complete
    let result = await Promise.all(updates);

    const responseBody = result;

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
