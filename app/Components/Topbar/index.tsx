"use client"
import { useState } from "react";
import { UserCircleIcon } from "@phosphor-icons/react";

import { usePathname } from "next/navigation";

function formatTitle(path: string): string {
    if (path === "/") return "Dashboard";

    return path
        .split("/")
        .filter(Boolean)
        .map(word => word.replace("-", " "))
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" / ");
}

const TopBar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
const pathname = usePathname();
    const title = formatTitle(pathname);
    return(
        <div className="bg-linear-to-r to-amber-400 from-blue-900 min-h-20 w-full overflow-y-hidden space-y-4 p-4">
            <div className="flex flex-row justify-between items-center">
                <p className="text-white text-2xl">{title}</p>
                <p className="text-white font-semibold text-lg">Home {">"} {title}</p>
                <div className="flex flex-row justify-center space-x-4 items-center text-white">
                <p className="text-xl">welcome,user!</p>
                  {/* Avatar */}
        <UserCircleIcon
          size={48}
          className="cursor-pointer"
          onClick={toggleDropdown}
        />

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-10 mt-48 w-32 bg-white text-black rounded-lg shadow-lg z-10">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
                </div>
            </div>
        </div>
    )
}

export default TopBar;