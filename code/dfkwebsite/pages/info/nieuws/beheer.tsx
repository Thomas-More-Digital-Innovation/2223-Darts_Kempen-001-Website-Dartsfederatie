import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Post, PostFront } from "../../../types/posts";
import { posts } from "./[name]";
import { columnType } from "../../competitie/beheer";
import { Icon } from "@iconify/react";
import { set } from "lodash";

const NieuwsBeheer: NextPage = () => {
  const [posts, setPosts] = useState<PostFront[]>([]);

  let postCount = 0;

  interface postColumnType extends columnType {
    selector: (row: PostFront) => any;
  }

  const columns: Array<postColumnType> = [
    {
      name: "ID",
      selector: (row) => {
        postCount++;
        return postCount;
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
        row.datePublished
          ? new Date(row.datePublished).toLocaleDateString("nl-BE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Niet gepubliceerd",
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
            onClick={() => onClickDelete(row.postID)}
            icon="mdi:delete"
          />
        </div>
      ),
      grow: 1,
    },
  ];

  const onClickDelete = (id: string) => {
    if (confirm("Ben je zeker dat je dit nieuwsbericht wilt verwijderen?")) {
      fetch(`/api/post/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          setPosts(posts.filter((post) => post.postID !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/post`)
        .then((post) => post.json())
        .then((parsedpost) => setPosts(parsedpost))
        .catch((err) => console.log(err));
    } else {
      setPosts(posts);
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

      <DataTable title="Nieuws" columns={columns} data={posts} pagination />
    </div>
  );
};

export default NieuwsBeheer;
