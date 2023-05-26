import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { clubRegexPatterns } from "../modules/club";
import * as formHandler from "../modules/formHandler";
import Modal from "./Modal";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import InformationBox from "./InformationBox";
import * as dummyData from "../data";
import { Club, ClubFront } from "../types/club";
import { SelectOption, getAllSelectOptionsByName } from "../modules/general";
import { getTeams } from "../modules/team";
import { getSpelers } from "../modules/player";

type AddClubModalData = {
  addModalOpen: boolean;
  setAddModalOpen: Dispatch<React.SetStateAction<boolean>>;
  clubs: Club[];
  setClubs: Dispatch<React.SetStateAction<ClubFront[]>>;
};

const AddClubModal: FunctionComponent<AddClubModalData> = (
  props: AddClubModalData
) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    name: "",
    address_city: "",
    address_street: "",
    address_housenumber: "",
    address_postal: "",
    contactpersonid: "",
    teamids: "",
  });

  const handleChange = (event: any) => {
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSelectChange = (
    value: { value: string; label: string }[],
    action: { action: string; name: string }
  ) => {
    formHandler.handleChangeSelect(value, action, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {
    let club: Club | null = await formHandler.handleSubmit(
      event,
      formValues,
      clubRegexPatterns,
      "/api/clubs",
      setInformationBoxMessage,
      setHandleSubmitSuccess,
      dummyData.club[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false
    );

    if (!club || !handleSubmitSuccess) return;

    setInformationBoxMessage(
      "Club succesvol aangemaakt, je wordt binnen 5 seconden terug gestuurd naar het algemeen overzicht."
    );
    props.setClubs((clubs) => {
      if (!club) return clubs;
      // The new Club will be of type Club, but we want it to be of type ClubFront
      return [...clubs, club as ClubFront];
    });
    setTimeout(() => {
      props.setAddModalOpen(false);
    }, 5000);
  };

  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  const [teams, setTeams] = useState<SelectOption[]>([]);
  const [spelers, setSpelers] = useState<SelectOption[]>([]);

  useEffect(() => {
    getTeams()
      .then((teams) => setTeams(teams))
      .catch((err) => console.log(err));

    getSpelers()
      .then((players) => setSpelers(players))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal
      title="Club toevoegen"
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
          id="clubnaam"
          name="name"
          label="Clubnaam"
          placeholder="Clubnaam"
          value={formValues.name}
          onChange={handleChange}
        />
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <DefaultInput
              name="address_city"
              label="Stad"
              placeholder="Stad"
              value={formValues.address_city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <DefaultInput
              name="address_postal"
              label="Postcode"
              placeholder="Postcode"
              value={formValues.address_postal}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <DefaultInput
              name="address_street"
              label="Straat"
              placeholder="Straat"
              value={formValues.address_street}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <DefaultInput
              name="address_housenumber"
              label="Huisnummer"
              placeholder="Huisnummer"
              value={formValues.address_housenumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <DefaultSelect
          name="contactpersonid"
          id="contactpersonid"
          label="Contactpersoon"
          options={spelers}
          search={true}
          onSelectChange={handleSelectChange}
        />

        <DefaultSelect
          name="teamids"
          id="teamids"
          label="Teams toevoegen"
          options={teams}
          onChange={handleChange}
          search={true}
          notRequired={true}
        />

        <button
          type="submit"
          className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
          onClick={handleSubmit}
        >
          Aanmaken
        </button>
      </div>
    </Modal>
  );
};

export default AddClubModal;
