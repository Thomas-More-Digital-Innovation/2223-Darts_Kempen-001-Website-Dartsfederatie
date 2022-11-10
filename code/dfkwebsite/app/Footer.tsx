import Image from "next/image";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";

// Functionaliteit toevoegen van dropdown optie
export default function Footer() {
  return (
    <footer className="bg-footer-background flex flex-col p-5 text-white">
      <div className="flex justify-between items-top">
        <div>
          <h1 className="text-2xl mb-1">Navigatie</h1>
          <ul>
            <li>  <Link href="#">Linknaam</Link>  </li>
            <li>  <Link href="#">Linknaam</Link>  </li>
            <li>  <Link href="#">Linknaam</Link>  </li>
          </ul>
        </div>

        <Image className="flex-grow-0" src={dfkLogo} alt="dfk logo" width={250} height={250}  />

        <div>
          <h1 className="text-2xl text-right mb-1">Nuttige links</h1>
          <ul className="text-right">
            <li>  <Link href="#">Privacyverklaring</Link>  </li>
            <li>  <Link href="#">Privacyverklaring</Link>  </li>
            <li>  <Link href="#">Privacyverklaring</Link>  </li>
          </ul>
        </div>
      </div>

      <div className="w-100 flex justify-between text-1xl mt-16 font-medium">
        <p>Darts Federatie Kempen &copy; {(new Date()).getFullYear()}</p>
        <p>Gemaakt door Barry en Dekkers</p>
      </div>
    </footer>
  );
}