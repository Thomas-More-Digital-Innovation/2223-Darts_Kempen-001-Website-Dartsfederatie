import { Icon } from "@iconify/react";
import { FunctionComponent, useState } from "react";

type FaqData = {
    question: string;
    answer: string;
}

const Faq: FunctionComponent<FaqData> = ({ question, answer }: any) => {
    const [open, setOpen] = useState(false);
    return (    
        <div className="py-7 px-8 bg-white  dark:bg-nav-background border-2 border-nav-background rounded-2xl shadow-10xl hover:cursor-pointer" onClick={() => setOpen(!open)}>
            <div className="flex flex-wrap justify-between -m-2">
                <div className="flex-1 p-2">
                    <h3 className={`${open ? "mb-4": ""} text-2xl font-semibold leading-normal`}>{question}</h3>
                    {open ? <p className="text-gray-600 dark:text-gray-200">{answer}</p> : null}
                </div>
                <div className="w-auto p-2">
                    {open ? <Icon icon="fa6-solid:angle-up" className="text-2xl" /> : <Icon icon="fa6-solid:angle-down" className="text-2xl" />}
                    
                </div>
            </div>
        </div>
    );
}

export default Faq;