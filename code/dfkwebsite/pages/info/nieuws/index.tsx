import { NextPage } from "next";
import ImageRead from "../../../components/ImageRead";
import { posts } from "./[name]";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";

const Nieuws: NextPage = () => {
  const [news, setNews] = useState(posts);
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/news`)
        .then((news) => news.json())
        .then((parsedNews) => setNews(parsedNews))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div>
      <Head>
        <title>DFK | Nieuws</title>
        <meta name="description" content="DFK nieuws" />
      </Head>
      <div className="flex items-center justify-between">
        <h1 className="text-6xl font-extrabold text-blacktext dark:text-white mb-5">
          Nieuws
        </h1>
        <Link
          href="/info/nieuws/beheer"
          className="py-4 px-6 mt-4 text-white dark:text-blacktext bg-neutral-700 hover:bg-neutral-800 dark:bg-gray-200 dark:hover:bg-gray-300"
        >
          Beheer
        </Link>
      </div>

      <ImageRead
        title={news[0].title}
        summary={news[0].text.substring(0, 100) + "..."}
        src={news[0].thumbnail}
        date={news[0].datePublished}
      />

      <div className="grid grid-cols-4 gap-8 mt-20 text-blacktext dark:text-white">
        {news.slice(1).map((news) => (
          <div className="w-full relative" key={news.title}>
            <div className="w-full h-[250px] relative">
              <Image
                className="bg-light-gray object-contain"
                src={news.thumbnail}
                alt={news.thumbnailAlt}
                fill
              ></Image>
            </div>
            <h1 className="font-bold text-4xl mt-4">{news.title}</h1>
            <h6 className="text-sm">
              {new Date(news.datePublished).toLocaleDateString()}
            </h6>
            <p className="mt-6">{news.text}</p>

            <Link
              className="inline-block py-4 px-6 mt-4 text-white dark:text-blacktext bg-neutral-700 hover:bg-neutral-800 dark:bg-gray-200 dark:hover:bg-gray-300"
              href={`/info/nieuws/${news.title
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              Lees meer
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nieuws;
