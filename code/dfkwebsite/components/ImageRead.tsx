import Image from "next/image";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";
import { FunctionComponent } from "react";

type imageData = {
  order?: boolean;
  title: string;
  summary: string;
  src?: string;
  date: number;
};

const ImageRead: FunctionComponent<imageData> = (imageData: imageData) => {
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 mb-10">
      <div className={`${imageData.order ? "lg:order-1" : "lg:order-0"}`}>
        <Image
          src={dfkLogo}
          alt="test"
          className={`bg-light-gray object-cover max-w-full relative overflow-hidden aspect-video `}
          height={400}
          width={600}
        />
      </div>
      <div
        className={`flex flex-col text-blacktext dark:text-white ${
          imageData.order ? "lg:order-0" : "lg:order-1 lg:text-left"
        }`}
      >
        <h1 className="font-extrabold text-2xl sm:text-3xl mb-1">
          {imageData.title}
        </h1>
        <h6 className="text-white text-sm mb-6">
          {new Date(imageData.date).toLocaleDateString("nl-BE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h6>
        <p className="text-lg lg:text-xl">{imageData.summary}</p>

        <Link
          className="text-white dark:text-blacktext w-fit text-lg lg:text-xl py-4 lg:py-4 px-4 lg:px-10 mt-4 lg:mt-12 bg-neutral-700 hover:bg-neutral-800 dark:bg-gray-200 dark:hover:bg-gray-300"
          href={`/info/nieuws/${imageData.title
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          Lees meer
        </Link>
      </div>
    </div>
  );
};

export default ImageRead;
