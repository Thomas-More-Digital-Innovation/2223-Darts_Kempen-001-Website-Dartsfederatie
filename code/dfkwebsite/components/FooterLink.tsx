import Link from "next/link";
import { FunctionComponent } from "react";

type MyProps = {
  href: string;
};

const FooterLink: FunctionComponent<MyProps> = ({ href }) => {
  return (
    <li className="hover:text-gray-400 dark:hover:text-gray-500">
      <Link href={"/" + href} className="capitalize">
        {href}
      </Link>
    </li>
  );
}

export default FooterLink;
