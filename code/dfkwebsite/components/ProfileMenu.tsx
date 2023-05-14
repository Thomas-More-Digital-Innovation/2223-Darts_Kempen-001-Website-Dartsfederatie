import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  function toggleDarkMode() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div>
      <div
        className=" text-[#fff] xl:text-xl relative hover:children:visible"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          icon="healthicons:ui-user-profile-outline"
          className="text-5xl bg-white rounded-[50%] text-black cursor-pointer "
        />
        <div
          className={`absolute top-full mt-2 border-r-2 right-0 flex flex-col ${
            isOpen ? "visible" : "invisible"
          } hover:children:text-gray-500 hover:children:cursor-pointer`}
        >
          <div
            className="flex p-4 bg-nav-background border-b border-gray-500"
            onClick={() => setShowLoginModal(!showLoginModal)}
          >
            <Icon icon="mdi:account" className="text-3xl" />
            <p>Profiel</p>
          </div>

          <div
            className="flex p-4 bg-nav-background border-b border-gray-500"
            onClick={() => toggleDarkMode()}
          >
            <Icon icon="mdi:weather-night" className="text-3xl" />
            <p>Dark&nbsp;mode</p>
          </div>
          <div className="flex p-4 bg-nav-background">
            <Icon icon="mdi:logout" className="text-3xl" />
            <p>Uitloggen</p>
          </div>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} setIsOpen={setShowLoginModal} />
    </div>
  );
}
