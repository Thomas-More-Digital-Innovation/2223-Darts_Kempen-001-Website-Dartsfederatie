import Head from "next/head";
import Selectie from "../../components/Selection";
import { NextPage } from "next";

const Overzicht: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DFK | Overzicht</title>
        <meta name="description" content="DFK overzicht" />
      </Head>
      <h1 className="text-6xl mb-20 text-blacktext dark:text-white font-bold">Overzicht</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 flew-wrap gap-20">
        <Selectie
          href="/overzicht/clubs"
          title="clubs"
          icon="game-icons:dart"
        />
        <Selectie
          href="/overzicht/teams"
          title="teams"
          icon="mdi:account-group-outline"
        />
        <Selectie
          href="/overzicht/spelers"
          title="spelers"
          icon="mdi:person-outline"
        />
        <Selectie
          href="/overzicht/bestuur"
          title="bestuur"
          icon="icon-park-outline:user-business"
        />
      </div>
    </div>
  );
};

export default Overzicht;
