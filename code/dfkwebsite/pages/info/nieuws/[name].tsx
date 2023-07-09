import ImageRead from "../../../components/ImageRead";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { News } from "../../../types/news";

export let posts : News[] = [
  {
    title: "Post 1",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    datePublished: 1,
    newsID: "1",
  },
  {
    title: "Post 2",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    datePublished: 2,
    newsID: "2",
  },
  {
    title: "Post 3",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    datePublished: 3,
    newsID: "3",
  },
  {
    title: "Post 4",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    datePublished: 4,
    newsID: "4",
  },
  {
    title: "Post 5",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    datePublished: 5,
    newsID: "5",
  },
];

posts.sort((a, b) => b.datePublished - a.datePublished);

const Nieuws: NextPage = () => {
  return (
    <div>
      <h1
        className="text-6xl font-extrabold text-blacktext dark:text-white mb-5"
      >
        Nieuws
      </h1>
      <ImageRead
        title={posts[0].title}
        summary={posts[0].text}
        src={posts[0].src}
        date={posts[0].datePublished}
      />

      <div className="grid grid-cols-4 gap-8">
        {posts.slice(1).map((post) => (
          <div className="w-full relative" key={post.newsID}>
            <div className="w-full h-[250px] relative">
              <Image
                className="bg-[#676767] object-contain"
                src={post.src}
                alt={post.srcAlt}
                fill
              ></Image>
            </div>
            <h1 className="font-bold text-4xl mt-4 text-white">{post.title}</h1>
            <h6 className="text-white text-sm">
              {new Date(post.datePublished).toLocaleDateString()}
            </h6>
            <p className="text-white mt-6">{post.text}</p>

            <Link
              className="inline-block py-4 px-6 mt-4 bg-blue-50"
              href={`/info/nieuws/${post.title
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
