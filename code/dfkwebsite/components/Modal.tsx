import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type ModalData = {
  title?: string;
  modalOpen: boolean;
  setModalOpen: any;
  children?: any;
};

const Modal: FunctionComponent<ModalData> = ({
  title,
  modalOpen,
  setModalOpen,
  children,
}) => {
  return (
    <div className={`${modalOpen ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
        <div className="bg-white dark:bg-background min-w-[33%] max-w-full rounded-2xl p-10 relative text-blacktext dark:text-white">
          <div className="flex justify-between items-center relative">
            {title ? (
              <h1 className="text-4xl font-semibold mr-10">{title}</h1>
            ) : (
              ""
            )}
            <Icon
              icon="mdi:close"
              className="text-3xl hover:text-red-500 hover:cursor-pointer absolute right-0"
              onClick={() => setModalOpen(false)}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
