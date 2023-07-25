import { getRecordByIdOrError } from "../../../../../modules/general";
import { Competition } from "../../../../../types/competition";
import { PagesEnv } from "../../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const competitionId = params.id.toString();
    const playday = await env.COMPETITION.get(
      `${competitionId}:${params.playday.toString()}`
    );
    if (!playday) throw new Error("Playday not found");

    const competition = await env.COMPETITION.get(competitionId);
    const competitionParsed: Competition = JSON.parse(competition);

    if (!competition) throw new Error("Competition not found");

    return new Response(JSON.stringify(competitionParsed), {
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
