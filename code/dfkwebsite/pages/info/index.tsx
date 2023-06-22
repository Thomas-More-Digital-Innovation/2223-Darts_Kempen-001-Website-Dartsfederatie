import Selectie from "../../components/Selection";
import { NextPage } from "next";

const Info: NextPage = () => {
  return (
    <div>
      <h1 className="text-6xl mb-20 text-blacktext dark:text-white font-bold">Info</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 flew-wrap gap-20">
        <Selectie
          href="/info/nieuws"
          title="nieuws"
          icon="fluent:news-16-regular"
        />
        <Selectie
          href="/info/documenten"
          title="documenten"
          icon="mdi:file-document-outline"
        />
        <Selectie
          href="/info/inschrijvingen"
          title="inschrijvingen"
          icon="mdi:file-document-edit-outline"
        />
      </div>
    </div>
  );
};

export default Info;
