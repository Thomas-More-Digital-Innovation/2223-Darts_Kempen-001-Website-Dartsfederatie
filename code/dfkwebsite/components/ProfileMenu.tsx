import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div>
      <li
      className=" text-[#fff] xl:text-xl relative hover:children:visible"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Icon
        icon="healthicons:ui-user-profile-outline"
        className="text-5xl bg-white rounded-[50%] text-black cursor-pointer "
      />
      <div
        className={`absolute top-[100%] right-0 flex flex-col ${
          isOpen ? "visible" : "invisible"
        } hover:children:text-gray-500 hover:children:cursor-pointer`}
      >
        <div
          className="flex p-4 bg-background border-b border-gray-500"
          onClick={() => setShowLoginModal(!showLoginModal)}
        >
          <Icon icon="mdi:account" className="text-3xl" />
          <p>Profiel</p>
        </div>
        
        <div className="flex p-4 bg-background border-b border-gray-500">
          <Icon icon="mdi:weather-night" className="text-3xl" />
          <p>Dark&nbsp;mode</p>
        </div>
        <div className="flex p-4 bg-background">
          <Icon icon="mdi:logout" className="text-3xl" />
          <p>Uitloggen</p>
        </div>
      </div>
      
    </li>
    <LoginModal isOpen={showLoginModal} setIsOpen={setShowLoginModal} />
    </div>
  );
}