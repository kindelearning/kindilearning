import { Logo } from "@/public/Images";
import Image from "next/image";
import { NavMenu } from "../../constant/menu";
import { Button } from "@/components/ui/button";
import { Navitem } from "@/app/Widgets";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 bg-white dark:bg-dark-blue-100 shadow-md flex justify-center items-center py-4 md:py-4">
      <section className="max-w-[1400px]  claracontainer xl:w-[1400px] flex flex-row justify-between items-center w-full">
        <Link href="/">
          <div className="logo">
            <Image src={Logo} className="w-auto h-auto" alt="Logo" />
          </div>
        </Link>

        {/* Hamburger icon for small screens */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <section className="lg:hidden flex flex-col items-start space-y-2 mt-4">
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
                <SheetTitle>
                  This Navigation is Temporary for easy accessibility
                </SheetTitle>
                <SheetDescription>#KindiLearning</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex flex-col md:flex-row gap-2 md:items-center md:justify-center w-full md:w-[max-content]">
          {NavMenu.map((menuItem, index) => (
            <a
              key={index}
              href={menuItem.link}
              className="text-light-blue-200 gap-[6px] flex-row w-[max-content] dark:text-dark-blue-200 text-lg font-semibold font-montserrat leading-6 flex items-center hover:text-dark-blue-100 transition duration-300 ease-in-out"
            >
              <Image
                src={menuItem.icon}
                alt={`${menuItem.title} icon`}
                width={24}
                height={24}
                className="h-[16px] w-[16px] transition duration-300 ease-in-out"
              />
              <span className="text-[16px] font-montserrat transition duration-300 ease-in-out hover:text-dark-blue-100">
                {menuItem.title}
              </span>
            </a>
          ))}
        </div>

        <div className="hidden lg:flex space-x-4">
          <Link href="/auth/sign-in">
            <Button className="bg-[#ffffff] border-[black] text-[black] hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-4 rounded-[16px] transition duration-300 ease-in-out">
              Login
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-purple px-[40px] hover:bg-[#7c61f5ce] hover:text-white border-4 border-purple rounded-[16px] transition duration-300 ease-in-out">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
