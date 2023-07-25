import ImageRead from "../../../components/ImageRead";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { Post, PostFront } from "../../../types/posts";
import { users } from "../../../data";

export let posts: PostFront[] = [
  {
    title: "Post 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    thumbnail: "/dfklogo.png",
    thumbnailAlt: "test",
    datePublished: 1,
    postID: "1",
    dateCreated: 1,
    authorID: "1",
    author: users[0],
    textFormatted:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "Post 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    thumbnail: "/dfklogo.png",
    thumbnailAlt: "test",
    datePublished: 2,
    postID: "2",
    dateCreated: 1,
    authorID: "1",
    author: users[0],
    textFormatted:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "Post 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    thumbnail: "/dfklogo.png",
    thumbnailAlt: "test",
    datePublished: 3,
    postID: "3",
    dateCreated: 1,
    authorID: "1",
    author: users[0],
    textFormatted:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "Post 4",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    thumbnail: "/dfklogo.png",
    thumbnailAlt: "test",
    datePublished: 4,
    postID: "4",
    dateCreated: 1,
    authorID: "1",
    author: users[0],
    textFormatted:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "Post 5",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    thumbnail: "/dfklogo.png",
    thumbnailAlt: "test",
    datePublished: 5,
    postID: "5",
    dateCreated: 1,
    authorID: "1",
    author: users[0],
    textFormatted:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
];

//TODO: Clean this up
posts.sort((a, b) => (b.datePublished ?? 0) - (a.datePublished ?? 0));

const Nieuws: NextPage = () => {
  return (
    <div>
      <h1 className="text-6xl font-extrabold text-blacktext dark:text-white mb-5">
        Nieuws
      </h1>
      <ImageRead
        title={posts[0].title}
        summary={posts[0].text}
        src={posts[0].thumbnail}
        date={posts[0].datePublished}
      />

      <div className="grid grid-cols-4 gap-8">
        {posts.slice(1).map((post) => (
          <div className="w-full relative" key={post.postID}>
            <div className="w-full h-[250px] relative">
              <Image
                className="bg-[#676767] object-contain"
                src={post.thumbnail}
                alt={post.thumbnailAlt}
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
