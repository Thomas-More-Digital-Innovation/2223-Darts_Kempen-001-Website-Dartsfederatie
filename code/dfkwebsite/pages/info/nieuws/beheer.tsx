import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { News } from "../../../types/news";
import { posts } from "./[name]";
import { columnType } from "../../competitie/beheer";
import { Icon } from "@iconify/react";
import { set } from "lodash";

const NieuwsBeheer: NextPage = () => {
  const [news, setNews] = useState<News[]>([]);

  let newsCount = 0;

  interface newsColumnType extends columnType {
    selector: (row: News) => any;
  }

  const columns: Array<newsColumnType> = [
    {
      name: "ID",
      selector: (row) => {
        newsCount++;
        return newsCount;
      },
      sortable: true,
      filterable: true,
    },
    {
      name: "Titel",
      selector: (row) => row.title,
      sortable: true,
      filterable: true,
    },
    {
      name: "Datum gepubliceerd",
      selector: (row) =>
        new Date(row.datePublished).toLocaleDateString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Acties",
      selector: (row) => (
        <div className="flex gap-3 flex-nowrap">
          <Icon
            className="cursor-pointer text-2xl"
            onClick={() => onClickDelete(row.newsID)}
            icon="mdi:delete"
          />
        </div>
      ),
      grow: 1,
    },
  ];

  const onClickDelete = (id: string) => {
    if (confirm("Ben je zeker dat je dit nieuwsbericht wilt verwijderen?")) {
      fetch(`/api/news/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          setNews(news.filter((news) => news.newsID !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/news`)
        .then((news) => news.json())
        .then((parsedNews) => setNews(parsedNews))
        .catch((err) => console.log(err));
    } else {
      setNews(posts);
    }
  }, []);
  return (
    <div>
      <Head>
        <title>DFK | Nieuws beheer</title>
        <meta name="description" content="DFK nieuws beheer" />
      </Head>
      <h1 className="text-6xl font-extrabold text-blacktext dark:text-white mb-5">
        Nieuws beheer
      </h1>

      <DataTable title="Nieuws" columns={columns} data={news} pagination />
    </div>
  );
};

export default NieuwsBeheer;
