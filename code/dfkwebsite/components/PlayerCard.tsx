import { Dispatch, FunctionComponent, SetStateAction } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
import { Player } from "../types/player";

interface playerDataInterface {
  playerData: Player;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentPlayer: Dispatch<SetStateAction<Player | null>>;
}

const PlayerCard: FunctionComponent<playerDataInterface> = ({
  playerData,
  setIsOpen,
  setCurrentPlayer,
}) => {
  return (
    <div>
      <CardTitle>{playerData.firstName + " " + playerData.lastName}</CardTitle>
      <CardButtonRow>
        <CardButton
          onClick={() => {
            setIsOpen(true);
            setCurrentPlayer(playerData);
          }}
        >
          Team
        </CardButton>
        <CardButton bg={"bg-edit-button"}>Edit</CardButton>
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon={"ph:phone"}>{playerData.phone}</CardIcon>
      </div>
    </div>
  );
};

export default PlayerCard;