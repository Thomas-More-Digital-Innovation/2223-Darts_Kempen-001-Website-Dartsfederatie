import { NextPage } from "next";

const Nieuws: NextPage = () => {
  return (
    <div>
      <h1 className="text-6xl font-extrabold text-blacktext dark:text-white mb-5">Nieuws</h1>
      {/* <ImageRead
        title={posts[0].title}
        summary={posts[0].summary}
        src={posts[0].src}
        date={posts[0].date}
      />

      <div className="grid grid-cols-4 gap-8">
        {posts.slice(1).map((post) => (
          <div className="w-full relative">
            <div className="w-full h-[250px] relative">
              <Image
                className="bg-light-gray object-contain"
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
      </div> */}
    </div>
  );
};

export default Nieuws;
