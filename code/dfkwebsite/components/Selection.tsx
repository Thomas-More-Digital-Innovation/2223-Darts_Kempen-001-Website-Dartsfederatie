import { Icon } from "@iconify/react";
import Link from "next/link";
import { FunctionComponent } from "react";

type selectionData = {
  href: string;
  title: string;
  icon: string;
};

const Selectie: FunctionComponent<selectionData> = (props: selectionData) => {
  return (
    <Link href={props.href} className="max-w-fit">
      <div className="bg-white dark:bg-nav-background rounded-xl p-3 h-full flex flex-col">
        <div className="dark:bg-background p-5 rounded-xl text-stone-900">
          <Icon
            icon={props.icon}
            className={`text-8xl ${
              props.title === "clubs" ? "rotate-90" : ""
            } mx-auto`}
          />
        </div>
        <p className="capitalize text-blacktext dark:text-gray-200 mt-2 text-4xl">{props.title}</p>
        <p className="my-5 text-blacktext dark:text-gray-200">
          Hier vind je een overzicht van {props.title}
        </p>
        <p className="bg-neutral-700 hover:bg-neutral-800 dark:hover:bg-gray-300 dark:bg-light-gray text-white dark:text-gray-200 rounded-md text-center py-2 mt-auto">
          Ga naar {props.title}
        </p>
      </div>
    </Link>
  );
};

export default Selectie;
