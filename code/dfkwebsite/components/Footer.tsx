import Image from "next/image";
import dfkLogo from "../public/DFK_logo_FC.svg";
import Link from "next/link";
import FooterLink from "./FooterLink";
import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-white dark:bg-footer-background flex flex-col px-10 lg:px-20 py-10 text-blacktext dark:text-white">
      <div className="flex flex-row items-top gap-10 lg:gap-0 justify-between items-top flex-wrap">
        <div className="order-0">
          <h1 className="text-2xl mb-1">Navigatie</h1>
          <ul>
            <FooterLink href="overzicht" />
            <FooterLink href="info" />
            <FooterLink href="competitie" />
            <FooterLink href="contact" />
          </ul>
        </div>

        <Image
          className="flex-grow-0 order-2 sm:order-1 mx-auto"
          src={dfkLogo}
          alt="dfk logo"
          width={250}
          height={250}
          loading="eager"
        />

        <div className="order-1 sm:order-2">
          <h1 className="text-2xl md:text-right mb-1">Nuttige links</h1>
          <ul className="md:text-right">
            <FooterLink href="privacyverklaring" />
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between text-1xl mt-16  text-center">
        <p className="font-medium">
          Darts Federatie Kempen &copy; {new Date().getFullYear()}
        </p>
        <p className="pt-8">
          Gemaakt door{" "}
          <Link href={"https://bryandeckers.com"} target="_blank"  className="hover:text-gray-400 dark:hover:text-gray-500 underline">
            Bryan Deckers
          </Link>{" "}
          en{" "}
          <Link href={"https://syandelbart.com"} target="_blank" className="hover:text-gray-400 dark:hover:text-gray-500 underline">
            Syan Delbart
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
