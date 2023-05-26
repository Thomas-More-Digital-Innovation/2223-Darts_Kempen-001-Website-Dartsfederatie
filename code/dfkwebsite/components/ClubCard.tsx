import { Dispatch, FunctionComponent, SetStateAction } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
import { ClubFront } from "../types/club";


interface clubDataInterface {
  clubData: ClubFront;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentClub: Dispatch<SetStateAction<ClubFront | null>>;
  setAddClubModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ClubCard: FunctionComponent<clubDataInterface> = ({
  clubData,
  setIsOpen,
  setCurrentClub,
  setAddClubModalOpen,
}) => {
  return (
    <div>
      <CardTitle>{clubData.name}</CardTitle>

      <CardButtonRow>
        <CardButton
          onClick={() => {
            setIsOpen(true);
            setCurrentClub(clubData);
          }}
        >
          Teams
        </CardButton>
        <CardButton
          bg={"bg-edit-button"}
          onClick={() => {
            setAddClubModalOpen(true);
            setCurrentClub(clubData);
          }}
        >
          Edit
        </CardButton>
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon="mdi:address-marker">
          <div className="flex gap-3">
            <p>{clubData.address?.postalCode}</p>
            <p>{clubData.address?.city}</p>
          </div>
          <div className="flex gap-3">
            <p>{clubData.address?.street}</p>
            <p>{clubData.address?.houseNumber}</p>
          </div>
        </CardIcon>
      </div>
    </div>
  );
};

export default ClubCard;
