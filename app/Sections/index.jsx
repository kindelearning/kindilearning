"use client";

import { Logo } from "@/public/Images";
import Image from "next/image";
import { useState } from "react";
import { NavMenu } from "../constant/menu";
import { HomeLight } from "@/public/Icons";
import GetStartedButton from "../Widgets/Button/GetStartedButton";
import Navitem from "../Widgets/Navbar/Navitem";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full h-[100px] bg-white dark:bg-dark-blue-100 shadow-md flex justify-center items-center px-8">
      <section className="max-w-[1400px] xl:w-[1400px] flex flex-row justify-between items-center w-full">
        <div className="logo">
          <Image src={Logo} className="w-auto h-auto" alt="Logo" />
        </div>

        {/* Hamburger icon for small screens */}
        <div className="lg:hidden df flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? (
              <p>X</p> // Replace with an appropriate close icon
            ) : (
              <p>Y</p> // Replace with an appropriate menu icon
            )}
          </button>
        </div>

        {/* Navigation Links - Hidden on small screens */}
        <div
          className={`flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-center w-full lg:w-[max-content] ${
            isMenuOpen ? "block" : "hidden"
          } lg:flex `}
        >
          {NavMenu.map((menuItem, index) => (
            <a
              key={index}
              href={menuItem.link}
              className="text-light-blue-200 gap-[6px] flex-row w-[max-content] dark:text-dark-blue-200 text-lg font-semibold font-montserrat leading-6 flex items-center"
            >
              <Image
                src={menuItem.icon}
                alt={`${menuItem.title} icon`}
                width={24}
                height={24}
                className="h-[16px] w-[16px]"
              />
              <span className="text-[16px]">{menuItem.title}</span>
            </a>
          ))}
        </div>

        <div className="hidden lg:flex space-x-4">
          <Button className="bg-purple px-[40px] border-2 rounded-[16px]">
            Get Started
          </Button>{" "}
        </div>
      </section>

      {/* Mobile Menu - Display when toggled */}
      {isMenuOpen && (
        <section className="lg:hidden flex flex-col items-center space-y-4 mt-4">
          {NavMenu?.map((menuItem, index) => (
            <Navitem
              key={index}
              IconSrc={menuItem.icon}
              Link={menuItem.link}
              Title={menuItem.title}
            />
          ))}
          <Button className="bg-purple px-[40px] border-2 rounded-[16px]">
            Get Started
          </Button>
        </section>
      )}
    </header>
  );
};

export default Header;
