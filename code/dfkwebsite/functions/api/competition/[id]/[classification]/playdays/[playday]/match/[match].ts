import { matchRegexPatterns } from "@/modules/competition";
import { getRecordByIdOrError, changeData } from "@/modules/general";
import { Competition } from "types/competition";
import { Match } from "@/types/match";
import { PagesEnv } from "@/functions/api/env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const competitionId = params.id.toString();
    const playdayNum = params.playday.toString();
    const matchNum = params.match.toString();

    let id = `match:${competitionId}:${playdayNum}:${matchNum}`;

    const match = JSON.parse(await getRecordByIdOrError(id, env.COMPETITION));

    console.log(match);

    return new Response(JSON.stringify(match), {
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
    console.log("onRequestPut");

    const competitionId = params.id.toString();
    const playdayNum = params.playday.toString();
    const matchNum = params.match.toString();

    let id = `match:${competitionId}:${playdayNum}:${matchNum}`;

    console.log("This happened");

    const formData = await request.formData();

    console.log("formData", formData);

    // checkFields(formData, matchRegexPatterns, true);

    const match = await env.COMPETITION.get(id);

    const matchData: Match = match ? JSON.parse(match) : {};

    console.log("matchData", matchData);

    const data: Competition = (await changeData(
      matchRegexPatterns,
      matchData,
      formData
    )) as Competition;

    console.log(data);

    // Update the competition data in the KV store
    await env.COMPETITION.put(id, JSON.stringify(data));

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
    const competitionId = params.id.toString();
    const playdayNum = params.playday.toString();
    const matchNum = params.match.toString();

    let id = `match:${competitionId}:${playdayNum}:${matchNum}`;

    const match = await env.COMPETITION.get(id);

    if (!match) {
      throw new Error("Match not found.");
    }

    const matchData: Match = JSON.parse(match);

    const data: Match = {
      ...matchData,
      deleted: true,
    };

    // Update the competition data in the KV store
    await env.COMPETITION.put(id, JSON.stringify(data));

    const responseBody = {
      message: "Match deleted successfully.",
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
