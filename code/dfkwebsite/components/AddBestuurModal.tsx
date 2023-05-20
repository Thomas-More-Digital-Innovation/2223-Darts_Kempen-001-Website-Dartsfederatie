import { FunctionComponent } from "react";
import Modal from "./Modal";
import DefaultInput from "./DefaultInput";
import DefaultCheckbox from "./DefaultCheckbox";
import DefaultSelect from "./DefaultSelect";

type AddBestuurModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
};

const AddBestuurModal: FunctionComponent<AddBestuurModalData> = (
  props: AddBestuurModalData
) => {
  return (
    <Modal
      title="Bestuur toevoegen"
      modalOpen={props.addModalOpen}
      setModalOpen={props.setAddModalOpen}
    >
      <div className="flex flex-col">
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
          options={[
            { value: "voorzitter", label: "Voorzitter" },
            { value: "secretaris", label: "Secretaris" },
            { value: "penningmeester", label: "Penningmeester" },
            { value: "algemeen bestuurslid", label: "Algemeen bestuurslid" },
          ]}
        />
        <button className="bg-[#0A893D] text-white rounded-lg p-3 mt-10">
          Aanmaken
        </button>
      </div>
    </Modal>
  );
};

export default AddBestuurModal;
