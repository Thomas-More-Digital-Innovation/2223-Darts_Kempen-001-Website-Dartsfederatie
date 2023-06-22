import ImageRead from "../../../components/ImageRead";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";

let posts = [
  {
    title: "Post 1",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    date: 1,
    key: 1,
  },
  {
    title: "Post 2",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    date: 2,
    key: 2,
  },
  {
    title: "Post 3",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    date: 3,
    key: 3,
  },
  {
    title: "Post 4",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    date: 4,
    key: 4,
  },
  {
    title: "Post 5",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    src: "/dfklogo.png",
    srcAlt: "test",
    date: 5,
    key: 5,
  },
];

posts.sort((a, b) => b.date - a.date);

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
        summary={posts[0].summary}
        src={posts[0].src}
        date={posts[0].date}
      />

      <div className="grid grid-cols-4 gap-8">
        {posts.slice(1).map((post) => (
          <div className="w-full relative" key={post.key}>
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
              {new Date(post.date).toLocaleDateString()}
            </h6>
            <p className="text-white mt-6">{post.summary}</p>

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
