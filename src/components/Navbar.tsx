"use client";

import { useState } from "react";
import { Bell, Grip } from "lucide-react";
import Image from "next/image";
import GlobalSearch from "./GlobalSearch";
import Link from "next/link";
import NavigationModal from "./NavigationModal";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  return (
    <nav className="bg-[#e2f0e7] flex justify-between items-center px-4 py-1 fixed w-full z-50">
      <div className="flex items-center space-x-4">
        <Grip onClick={toggleModal} className="cursor-pointer text-gray-600 hover:text-gray-800" />
        <div className="flex items-center space-x-2">
          {/* <Image src="/logo.png" alt="Logo" width={24} height={24} /> */}
          <Link href='/'>
          <span className="font-semibold text-gray-800">AIO-DMS</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 hover:text-gray-800 mr-2">
          <Bell size={20} />
          <span className="absolute shadow-md -top-2 -right-3 bg-white text-black text-xs w-4 h-4 flex items-center justify-center rounded-full">
            1
          </span>
        </button>
        <span className="text-2xl pb-2 text-gray-400 font-[100] font-sans">|</span>
        <GlobalSearch />
        <span className="text-[23px] pt-[1px] cursor-pointer text-gray-600 hover:text-gray-800">?</span>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300"
          >
            <Image src="/profile.jpg" alt="User Avatar" width={50} height={50} />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-md text-sm rounded-lg py-2 z-50">
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Setting</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
            </div>
          )}
        </div>
      </div>

      {/* Render the NavigationModal */}
      <NavigationModal isOpen={isModalOpen} onClose={toggleModal} />
    </nav>
  );
};

export default Navbar;