import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
import { TeamFront } from "../types/team";

export type teamData = {
  teamnaam: string;
  kapitein: string;
  telefoonnummer: string;
};

interface teamDataInterface {
  teamData: TeamFront;
  setIsOpen: any;
}

const TeamCard: FunctionComponent<teamDataInterface> = ({
  teamData,
  setIsOpen,
}) => {
  return (
    <>
      <CardTitle>{teamData.name}</CardTitle>
      <CardButtonRow>
        <CardButton onClick={() => setIsOpen(true)}>Spelers</CardButton>
        <CardButton bg={"bg-[#95A4F3]"}>Edit</CardButton>
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon={"game-icons:captain-hat-profile"}>
          {teamData.captain?.firstName + " " + teamData.captain?.lastName}
        </CardIcon>
        {teamData.captain?.phone ? (
          <CardIcon icon={"ph:phone"}>{teamData.captain.phone}</CardIcon>
        ) : null}
      </div>
    </>
  );
};

export default TeamCard;