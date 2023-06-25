import Head from "next/head";
import ImageRead from "../components/ImageRead";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DFK | Startpagina</title>
        <meta name="description" content="DFK startpagina" />
      </Head>
      <div className="flex flex-col gap-24">
        <ImageRead
          title="This is a title"
          summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
          date={1}
        />
        <ImageRead
          title="This is a title"
          summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris..."
          order={true}
          date={1}
        />
      </div>

      <div className="mt-20">
        <h1 className="font-extrabold text-3xl sm:text-5xl mb-1 sm:mb-5 text-black dark:text-white">
          Toernooi in de kijker
        </h1>
        <div className="aspect-[9/16] w-full bg-light-gray"></div>
      </div>
    </div>
  );
};

export default HomePage;
