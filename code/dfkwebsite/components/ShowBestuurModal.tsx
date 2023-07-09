import { FunctionComponent, useState } from "react";
import Modal from "./Modal";
import DefaultInput from "./DefaultInput";
import DefaultCheckbox from "./DefaultCheckbox";
import DefaultSelect from "./DefaultSelect";
import InformationBox from "./InformationBox";
import SubmitButton from "./SubmitButton";

type ShowBestuurModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
};

const ShowBestuurModal: FunctionComponent<ShowBestuurModalData> = (
  props: ShowBestuurModalData
) => {
  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  const handleSubmit = async (event: any) => {
    let bestuurslid: Club | null = await formHandler.handleSubmit(
      event,
      formValues,
      clubRegexPatterns,
      props.currentClub
        ? `/api/clubs/${props.currentClub.clubID}`
        : "/api/clubs",
      setInformationBoxMessage,
      setHandleSubmitSuccess,
      dummyData.club[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false,
      props.currentClub ? true : false
    );

    if (!club) return;

    setInformationBoxMessage(
      "Bestuurslid succesvol aangemaakt, je wordt binnen 5 seconden terug gestuurd naar het algemeen overzicht."
    );
    props.setClubs((clubs) => {
      if (!club) return clubs;
      // The new Club will be of type Club, but we want it to be of type ClubFront
      return [...clubs, club as ClubFront];
    });
    setTimeout(() => {
      props.setAddModalOpen(false);
      setInformationBoxMessage("")
    }, 5000);
  };

  return (
    <Modal
      title="Bestuur toevoegen"
      modalOpen={props.addModalOpen}
      setModalOpen={props.setAddModalOpen}
    >
      <div className="flex flex-col">
        <InformationBox
          success={handleSubmitSuccess}
          show={informationBoxMessage !== ""}
          onClose={() => setInformationBoxMessage("")}
        >
          {informationBoxMessage}
        </InformationBox>
        <DefaultInput
          name="firstname"
          label="Voornaam"
          placeholder="Voornaam"
        />

        <DefaultInput
          name="lastname"
          label="Achternaam"
          placeholder="Achternaam"
        />
        <DefaultInput
          name="phone"
          label="Telefoonnummer"
          placeholder="Telefoonnummer"
          type="phone"
        />
        <div className="mt-5 mb-2">
          <DefaultCheckbox label="Speelgerechtigd" name="allowedToPlay" />
        </div>
        <DefaultSelect
          name="function"
          label="Functie"
          search={true}
          options={[
            { value: "voorzitter", label: "Voorzitter" },
            { value: "secretaris", label: "Secretaris" },
            { value: "penningmeester", label: "Penningmeester" },
            { value: "algemeen bestuurslid", label: "Algemeen bestuurslid" },
          ]}
        />
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
    </Modal>
  );
};

export default ShowBestuurModal;
