import { NextPage } from "next";
import GewestFilter from "../../../components/GewestFilter";
import KlassementTable from "../../../components/KlassementTable";
import { TeamRanking, TROPHY } from "../../../types/general";

const provinciaal: Array<TeamRanking> = [
  {
    id: 1,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
    trophy: TROPHY.GOLD,
  },
  {
    id: 2,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
    trophy: TROPHY.SILVER,
  },
  {
    id: 3,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
    trophy: TROPHY.BRONZE,
  },
  {
    id: 4,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 5,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 6,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
];

const Klassement: NextPage = () => {
  return (
    <div className="text-blacktext dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-extrabold mb-5">Klassement ranking</h1>
        <div className="w-1/3">
          <GewestFilter />
        </div>
      </div>

      <div className="my-5">
        <h2 className="text-4xl font-semibold my-10">Provinciaal</h2>
        <table className="table-auto w-full text-center text-[#313131]">
          <thead>
            <tr className="text-white bg-[#313131] h-12">
              <th className="w-5"></th>
              <th>Nr.</th>
              <th>Ploegnaam</th>
              <th>Gespeeld</th>
              <th>Gewonnen</th>
              <th>Gelijk</th>
              <th>Verloren</th>
              <th>Voor</th>
              <th>Tegen</th>
              <th>Punten</th>
            </tr>
          </thead>

          <tbody>
            {provinciaal.map((team, i) => {
              return <KlassementTable key={i} teamData={team} index={i} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Klassement;
