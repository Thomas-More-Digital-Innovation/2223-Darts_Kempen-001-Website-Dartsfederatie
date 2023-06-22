import { NextPage } from "next";
import Faq from "../../components/Faq";
import DefaultInput from "../../components/DefaultInput";
import DefaultSelect from "../../components/DefaultSelect";
import { bestuur } from "../../data";
import DefaultCheckbox from "../../components/DefaultCheckbox";

const Contact: NextPage = () => {
  return (
    <div className="text-blacktext dark:text-white">
      <h1 className="text-6xl font-extrabold mb-5">
        Contact pagina
      </h1>

      <h2 className="text-4xl font-semibold my-10">FAQ</h2>

      <div className="flex flex-col gap-5">
        <Faq question="Vraag" answer="Antwoord" />
        <Faq question="Vraag" answer="Antwoord" />
      </div>

      <div className="my-20">
        <h2 className="text-4xl font-semibold mb-10">Contacteer ons</h2>
        <form action="" className="flex flex-col gap-5 w-8/12">
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 w-1/2">
              <DefaultInput
                name="afzender"
                label="Afzender"
                placeholder="Afzender"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <DefaultInput
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 w-1/2">
              <DefaultSelect
                name="aan"
                label="Aan"
                options={bestuur.map((lid, index) => {
                  return {
                    label: `${lid.functie} (${lid.naam})`,
                    value: index.toString(),
                  };
                })}
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <DefaultInput
                name="onderwerp"
                label="Onderwerp"
                placeholder="Onderwerp"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <DefaultInput
              name="bericht"
              label="Bericht"
              placeholder="Bericht"
              textArea
            />
          </div>
          <div className="flex items-center gap-5">
            <DefaultCheckbox
              label="Stuur mij een kopie"
              name="kopie"
              id="kopie"
            />
          </div>
          <button
            type="submit"
            className="text-white dark:text-blacktext bg-neutral-700 hover:bg-neutral-800 dark:hover:bg-gray-300 dark:bg-nav-background px-10 py-2 rounded w-1/3"
          >
            Verstuur
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
