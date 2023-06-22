import { NextPage } from "next";
import Selectie from "../../components/Selection";

const Competitie: NextPage = () => {
  return (
    <div>
      <h1 className="text-6xl mb-20 text-blacktext dark:text-white font-bold">Competitie</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 flew-wrap gap-20">
        <Selectie
          href="/competitie/beheer"
          title="beheer competities"
          icon="mdi:calculator"
        />
        <Selectie
          href="/competitie/speeldagen"
          title="speeldagen"
          icon="mdi:calendar-today"
        />
        <Selectie
          href="/competitie/klassement"
          title="klassement"
          icon="mdi:podium"
        />
        <Selectie
          href="/competitie/individueleranking"
          title="individuele ranking"
          icon="mdi:trophy"
        />
      </div>
    </div>
  );
};

export default Competitie;
