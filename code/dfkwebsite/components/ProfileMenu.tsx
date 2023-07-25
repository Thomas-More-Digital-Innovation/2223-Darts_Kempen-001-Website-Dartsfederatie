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
    const savedDarkModePreference = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If the user has a saved preference, apply it
    if (savedDarkModePreference !== null) {
      if (savedDarkModePreference === "true") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    // If there is no saved preference, apply system preference
    else if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);  

  return (
    <div>
      <div
        className="text-blacktext dark:text-[#fff] xl:text-xl relative hover:children:visible z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          icon="healthicons:ui-user-profile-outline"
          className="text-5xl rounded-[50%] cursor-pointer"
        />
        <div
          className={`absolute top-full mt-2 right-0 flex flex-col shadow-md ${
            isOpen ? "visible" : "invisible"
          } hover:children:text-gray-500 hover:children:cursor-pointer`}
        >
          <div
            className="flex p-4 bg-white dark:bg-nav-background border-b border-black dark:border-gray-500"
            onClick={() => setShowLoginModal(!showLoginModal)}
          >
            <Icon icon="mdi:account" className="text-3xl" />
            <p>Profiel</p>
          </div>

          <div
            className="flex p-4 bg-white dark:bg-nav-background border-b border-black dark:border-gray-500"
            onClick={() => toggleDarkMode()}
          >
            <Icon icon="mdi:weather-night" className="text-3xl" />
            <p>Dark&nbsp;mode</p>
          </div>
          <div className="flex p-4 bg-white dark:bg-nav-background">
            <Icon icon="mdi:logout" className="text-3xl" />
            <p>Uitloggen</p>
          </div>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} setIsOpen={setShowLoginModal} />
    </div>
  );
}
