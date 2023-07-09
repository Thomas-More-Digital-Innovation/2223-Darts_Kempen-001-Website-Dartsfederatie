import { NextPage } from "next";
import { useEffect, useState } from "react";
import ShowBestuurModal from "../../../components/ShowBestuurModal";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import * as dummyData from "../../../data";
import ManagementCard from "../../../components/ManagementCard";
import Head from "next/head";
import SearchableCardGrid from "../../../components/SearchableCardGrid";

const Bestuur: NextPage = () => {
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [bestuur, setBestuur] = useState(dummyData.bestuur);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/bestuur`)
        .then((bestuur) => bestuur.json())
        .then((parsedBestuur) => setBestuur(parsedBestuur)).catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <Head>
        <title>DFK | Bestuur</title>
        <meta name="description" content="DFK bestuur" />
      </Head>
      <ShowBestuurModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <OverzichtTopBar
        titleName="Bestuur"
        setSearch={setSearch}
        addButtonName="Bestuur toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <SearchableCardGrid items={bestuur} search={search} filterName="naam">
        {(bestuur) => (
          <ManagementCard
            key={bestuur.bestuurID}
            naam={bestuur.naam}
            mail={bestuur.mail}
            telefoonnummer={bestuur.telefoonnummer}
            functie={bestuur.functie}
          />
        )}
      </SearchableCardGrid>
    </div>
  );
};

export default Bestuur;
