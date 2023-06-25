import { FunctionComponent } from "react";

const Card : FunctionComponent<any> = ({ children }: any) => {
  return (
    <>
    <div className="bg-zinc-100 dark:bg-nav-background py-5 px-10 rounded-lg text-blacktext dark:text-white flex-1">
        {children}
    </div>
    </>
  );
}

export default Card;