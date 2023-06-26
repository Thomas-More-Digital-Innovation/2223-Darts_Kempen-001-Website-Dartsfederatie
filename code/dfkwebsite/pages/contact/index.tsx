import { NextPage } from "next";
import Faq from "../../components/Faq";
import DefaultInput from "../../components/DefaultInput";
import DefaultSelect from "../../components/DefaultSelect";
import { bestuur } from "../../data";
import DefaultCheckbox from "../../components/DefaultCheckbox";
import Modal from "../../components/Modal";
import { useState } from "react";
import Head from "next/head";

const questions = [
  {
    question: "Vraag",
    answer: "Antwoord",
  },
  {
    question: "Vraag",
    answer: "Antwoord",
  },
];

const Contact: NextPage = () => {
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [detailedFaqModalOpen, setDetailedFaqModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);

  return (
    <div className="text-blacktext dark:text-white">
      <Head>
        <title>DFK | Contact</title>
        <meta name="description" content="DFK contact" />
      </Head>
      <Modal
        title="Beheer FAQ"
        modalOpen={faqModalOpen}
        setModalOpen={setFaqModalOpen}
      >
        <div className="flex flex-col mt-5">
          {questions.map((question, index) => {
            return (
              <p
                className="text-lg bg-white dark:bg-nav-background border-2 border-nav-background dark:border-none hover:cursor-pointer my-2 px-2 py-2 rounded-lg"
                key={question.question}
                onClick={() => {
                  setSelectedQuestion(question);
                  setDetailedFaqModalOpen(true);
                }}
              >
                {question.question}
              </p>
            );
          })}
        </div>
        <button
          className="bg-add-button text-white rounded-lg mt-5 px-5 py-3 hover:cursor-pointer"
          onClick={() => {
            setAddQuestionModalOpen(true);
          }}
        >
          Vraag toevoegen
        </button>
      </Modal>
      <Modal
        title="Vraag toevoegen"
        modalOpen={addQuestionModalOpen}
        setModalOpen={setAddQuestionModalOpen}
      >
        <DefaultInput
          label="Vraag"
          name="question"
          value=""
          onChange={() => {}}
          notRequired
        />
        <DefaultInput
          label="Antwoord"
          name="answer"
          value=""
          onChange={() => {}}
          notRequired
          textArea
        />
        <button
          className="bg-add-button text-white rounded-lg mt-5 px-5 py-3 hover:cursor-pointer"
        >
          Vraag toevoegen
        </button>
      </Modal>
      <Modal
        title={selectedQuestion.question}
        modalOpen={detailedFaqModalOpen}
        setModalOpen={setDetailedFaqModalOpen}
      >
        <DefaultInput
          label="Vraag"
          name="question"
          value={selectedQuestion.question}
          onChange={() => {}}
          notRequired
        />
        <DefaultInput
          label="Antwoord"
          name="answer"
          value={selectedQuestion.answer}
          onChange={() => {}}
          notRequired
          textArea
        />
        <div className="flex gap-5 mt-10">
          <button className="bg-red-700 text-white rounded-lg px-5 py-3 hover:cursor-pointer">
            Verwijder vraag
          </button>
          <button className="bg-add-button text-white rounded-lg px-5 py-3 hover:cursor-pointer">
            Wijzig vraag
          </button>
        </div>
      </Modal>
      <h1 className="text-6xl font-extrabold mb-5">Contact pagina</h1>

      <div className="flex justify-between mt-20 mb-10">
        <h2 className="text-4xl font-semibold">FAQ</h2>
        <button
          className="bg-add-button text-white rounded-lg px-5 py-3 hover:cursor-pointer"
          onClick={() => setFaqModalOpen(true)}
        >
          Beheer FAQ
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {questions.map((question, index) => {
          return (
            <Faq
              key={question.question}
              question={question.question}
              answer={question.answer}
            />
          );
        })}
      </div>

      <div className="my-20">
        <h2 className="text-4xl font-semibold mt-40 mb-10">Contacteer ons</h2>
        <form action="" className="grid grid-cols-2 gap-5 w-2/3">
          <div className="">
            <DefaultInput
              name="afzender"
              label="Afzender"
              placeholder="Afzender"
            />
          </div>
          <div className="">
            <DefaultInput
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="">
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
          <div className="">
            <DefaultInput
              name="onderwerp"
              label="Onderwerp"
              placeholder="Onderwerp"
            />
          </div>
          <div className="col-span-2">
            <DefaultInput
              name="bericht"
              label="Bericht"
              placeholder="Bericht"
              textArea
            />
          </div>
          <div className="col-span-2">
            <DefaultCheckbox
              label="Stuur mij een kopie"
              name="kopie"
              id="kopie"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-add-button hover:bg-opacity-80 px-10 py-2 rounded w-1/3"
          >
            Verstuur
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
