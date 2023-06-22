import { NextPage } from "next";
import GewestFilter from "../../../components/GewestFilter";
import IndividueleRankingTable from "../../../components/IndividueleRankingTable";
import { PersonRanking, TROPHY } from "../../../types/general";

const provinciaal : Array<PersonRanking> = [
  {
    id: 1,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
    trophy: TROPHY.GOLD
  },
  {
    id: 2,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
    trophy: TROPHY.SILVER
  },
  {
    id: 3,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
    trophy: TROPHY.BRONZE
  },
  {
    id: 4,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
  {
    id: 5,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
  {
    id: 6,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
];

const IndividueleRanking : NextPage = () => {
  return (
    <div className="text-blacktext dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-extrabold mb-5">Individuele ranking</h1>
        <div className="w-1/3">
          <GewestFilter />
        </div>
      </div>

      <div className="my-5">
        <h2 className="text-4xl font-semibold my-10">Provinciaal</h2>
        <table className="w-full text-center text-[#313131]">
          <thead>
            <tr className="bg-[#313131] text-white h-12">
              <th className="w-5"></th>
              <th>Nr.</th>
              <th>Naam</th>
              <th>Ploeg</th>
              <th>Punten</th>
              <th>180</th>
              <th>Shot</th>
              <th>K. Leg</th>
            </tr>
          </thead>

          <tbody>
           {provinciaal.map((person, i) => {
              return <IndividueleRankingTable  key={i} personData={person} index={i}  />;
            })
           }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IndividueleRanking;