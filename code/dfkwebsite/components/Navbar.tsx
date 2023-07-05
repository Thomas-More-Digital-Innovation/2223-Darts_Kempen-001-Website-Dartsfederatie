"use client";

import Image from "next/image";
import NavItem from "./NavItem";
import dfkLogo from "../public/DFK_logo_FC.svg";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { FunctionComponent, useState } from "react";
import ProfileMenu from "./ProfileMenu";

const routes = [
  {
    href: "/",
    title: "Startpagina",
  },
  {
    href: "/overzicht",
    title: "Overzicht",
    dropdown: [
      {
        href: "/overzicht/clubs",
        title: "Clubs",
      },
      {
        href: "/overzicht/teams",
        title: "Teams",
      },
      {
        href: "/overzicht/spelers",
        title: "Spelers",
      },
      {
        href: "/overzicht/bestuur",
        title: "Bestuur",
      },
    ],
  },
  {
    href: "/info",
    title: "Info",
    dropdown: [
      {
        href: "/info/nieuws",
        title: "Nieuws",
      },
      {
        href: "/info/reglementen",
        title: "Reglementen",
      },
      {
        href: "/info/inschrijvingen",
        title: "Inschrijvingen",
      },
    ],
  },
  {
    href: "/competitie",
    title: "Competitie",
    dropdown: [
      {
        href: "/competitie/speeldagen",
        title: "Speeldagen",
      },
      {
        href: "/competitie/klassement",
        title: "Klassement",
      },
      {
        href: "/competitie/individueleranking",
        title: "Individuele ranking",
      },
    ],
  },
  {
    href: "/contact",
    title: "Contact",
  },
];

// Functionaliteit toevoegen van dropdown optie
const Navbar: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="px-10 lg:px-20 py-5 flex flex-wrap justify-between items-center relative">
      <Icon
        icon="mdi:hamburger-menu"
        className="lg:hidden text-6xl text-blacktext dark:text-white order-0 lg:order-1"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Link href={"/"}>
        <Image
          src={dfkLogo}
          alt="dfk logo"
          width={150}
          height={100}
          className="aspect-square h-16 sm:h-full object-contain order-1 lg:order-0"
          loading="eager"
        />
      </Link>

      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row gap-5 lg:gap-8 xl:gap-15 2xl:gap-20 items-center absolute top-full left-0 py-5 z-10 bg-white dark:bg-background lg:relative`}
      >
        {routes.map((route, index) => {
          return (
            <NavItem
              href={route.href}
              title={route.title}
              dropdown={route.dropdown}
              key={index}
            />
          );
        })}
      </ul>
      <ProfileMenu />
    </nav>
  );
};

export default Navbar;
