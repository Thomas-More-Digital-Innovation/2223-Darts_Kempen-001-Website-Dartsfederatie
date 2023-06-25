import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { clubRegexPatterns } from "../modules/club";
import * as formHandler from "../modules/formHandler";
import Modal from "./Modal";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import InformationBox from "./InformationBox";
import * as dummyData from "../data";
import { Club, ClubFront } from "../types/club";
import { SelectOption } from "../modules/general";
import { getTeams } from "../modules/team";
import { getPlayers } from "../modules/player";
import SubmitButton from "./SubmitButton";

type AddClubModalData = {
  addModalOpen: boolean;
  setAddModalOpen: Dispatch<React.SetStateAction<boolean>>;
  clubs: Club[];
  setClubs: Dispatch<React.SetStateAction<ClubFront[]>>;
  currentClub?: ClubFront | null;
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
    contactPersonID: "",
    teamIDs: "",
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
      "Club succesvol aangemaakt, je wordt binnen 5 seconden terug gestuurd naar het algemeen overzicht."
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

  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  const [teams, setTeams] = useState<SelectOption[]>([
    { value: dummyData.teams[0].teamID, label: dummyData.teams[0].name },
  ]);
  const [players, setPlayers] = useState<SelectOption[]>([
    {
      value: dummyData.players[0].playerID,
      label:
        dummyData.players[0].firstName + " " + dummyData.players[0].lastName,
    },
  ]);

  useEffect(() => {
    getTeams()
      .then((teams) => setTeams(teams))
      .catch((err) => console.log(err));

    getPlayers()
      .then((players) => setPlayers(players))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFormValues({
      name: props.currentClub ? props.currentClub.name : "",
      address_city: props.currentClub?.address
        ? props.currentClub.address?.city
        : "",
      address_street: props.currentClub?.address
        ? props.currentClub.address?.street
        : "",
      address_housenumber: props.currentClub?.address
        ? props.currentClub.address?.housenumber
        : "",
      address_postal: props.currentClub?.address
        ? props.currentClub.address?.postal
        : "",
    });
  }, [props.currentClub]);

  return (
    <Modal
      title={props.currentClub ? "Club bewerken" : "Club toevoegen"}
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
          name="contactPersonID"
          id="contactPersonID"
          label="Contactpersoon"
          options={players}
          defaultValue={
            props.currentClub?.contactPerson
              ? [
                  {
                    value: props.currentClub.contactPerson.playerID,
                    label:
                      props.currentClub.contactPerson.firstName +
                      " " +
                      props.currentClub.contactPerson.lastName,
                  },
                ]
              : []
          }
          search={true}
          onSelectChange={handleSelectChange}
          notRequired={true}
        />

        <DefaultSelect
          name="teamIDs"
          id="teamIDs"
          label="Teams toevoegen"
          options={teams}
          onSelectChange={handleSelectChange}
          multiple={true}
          search={true}
          notRequired={true}
          defaultValue={
            props.currentClub?.teams
              ? props.currentClub.teams.map((team) => {
                  return {
                    value: team.teamID,
                    label: team.name,
                  };
                })
              : []
          }
        />

        <SubmitButton handleSubmit={handleSubmit} current={props.currentClub} />
      </div>
    </Modal>
  );
};

export default AddClubModal;
