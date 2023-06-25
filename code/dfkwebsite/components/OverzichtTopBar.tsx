import { FunctionComponent } from "react";
import AddButton from "./AddButton";
import SearchBar from "./SearchBar";

type topBarData = {
  titleName: string;
  setSearch?: Function;
  addButtonName?: string;
  addModalOpen?: boolean;
  setAddModalOpen?: any;
  setResetCurrent?:  any;
};

const OverzichtTopBar: FunctionComponent<topBarData> = ({
  titleName,
  setSearch,
  addButtonName,
  addModalOpen,
  setAddModalOpen,
  setResetCurrent,
}: any) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-6xl font-extrabold text-blacktext dark:text-white">{titleName}</h1>
      <div className="flex gap-10 items-center">
        {addButtonName && typeof setAddModalOpen == "function" ? (
          <AddButton
            name={addButtonName}
            addModalOpen={addModalOpen}
            setAddModalOpen={setAddModalOpen}
            setResetCurrent={setResetCurrent}
          />
        ) : (
          ""
        )}
        {typeof setSearch == "function" ? (
          <SearchBar setSearch={setSearch} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OverzichtTopBar;
