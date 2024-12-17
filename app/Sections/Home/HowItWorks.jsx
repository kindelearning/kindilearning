import { fetchHowItWorksData } from "@/app/data/p/Home";
import { Curve, CurveTwo } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

export default async function HowItWorks() {
  const content = await fetchHowItWorksData();

  if (!content) {
    return <p>Unable to load content data. Please try again later.</p>;
  }

  const { MainTitle, MainBody, HIWSection } = content;
  return (
    <>
      <section className="w-full h-auto bg-[#4e2f71] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px] duration-300 animate-fade-in">
        <div className="claracontainer w-full px-4 md:px-2 lg:px-4 pb-6 pt-20 flex-col justify-start items-center gap-7 inline-flex">
          <div className="w-auto claracontainer flex-col justify-start items-start md:items-center gap-6 inline-flex">
            <div className="w-full text-start md:text-center">
              <span className="text-white claraheading animate-fade-in">
                {MainTitle
                  ? MainTitle.split(" ").slice(0, 2).join(" ")
                  : "How It "}{" "}
              </span>
              <span className="text-red text-start md:text-center claraheading animate-fade-in">
                {MainTitle
                  ? MainTitle.split(" ").slice(2, 3).join(" ")
                  : " Works"}{" "}
              </span>
            </div>
            {MainBody?.map((desc, index) => (
              <p
                key={index}
                className="w-full md:w-[500px] xl:w-[800px] text-start md:text-center animate-fade-in text-white clarabodyTwo"
              >
                {desc.children[0]?.text}
              </p>
            ))}
          </div>

          <div className="flex w-full justify-center items-center flex-col gap-12">
            {/* Section One */}
            {HIWSection?.slice(0, 1).map((section, index) => (
              <div
                key={index}
                className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4"
              >
                <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                  <div className="text-white text-6xl md:text-[50px] p-0 animate-fade-in font-semibold font-fredoka uppercase leading-10">
                    01
                  </div>
                  <div className="flex-col flex justify-start items-start gap-6">
                    <div className="flex-col w-full justify-start items-start gap-5 flex">
                      <div className="w-full gap-3">
                        <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                          {section.featuredText} <br />
                        </span>
                        <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                          {section.title}
                        </span>
                      </div>
                      {/* <div className="w-full text-white animate-fade-in clarabodyTwo">
                          <p>{homeData[0].howItWorksOne}</p>
                        </div> */}
                      {section.BodyDescription?.map((desc, idx) => (
                        <p
                          className="w-full text-white animate-fade-in clarabodyTwo"
                          key={idx}
                        >
                          {desc.children[0]?.text}
                        </p>
                      ))}
                    </div>
                    <Link
                      href="/p/how-it-works#video"
                      rel="noopener noreferrer"
                      className="w-full h-12 "
                    >
                      <Link
                        href="/p/how-it-works"
                        className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton"
                      >
                        SHOW ME
                      </Link>
                    </Link>
                  </div>
                </div>
                <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
                  {/* <Image
                      alt="Kindi"
                      width={100}
                      height={100}
                      src={homeData[0]?.hiwOne?.url}
                      className="w-full h-full object-contain"
                    /> */}
                </div>
              </div>
            ))}
            <Image
              alt="Kindi"
              src={Curve}
              className="hidden md:hidden lg:flex w-[50%] -mb-[60px] -mt-[140px]"
            />

            {/* Section Two */}
            {HIWSection?.slice(1, 2).map((section, index) => (
              <div
                key={index}
                className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4"
              >
                <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
                  {/* <Image
                      alt="Kindi"
                      width={100}
                      height={100}
                      src={homeData[0]?.hiwOne?.url}
                      className="w-full h-full object-contain"
                    /> */}
                </div>
                <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                  <div className="text-white text-6xl md:text-[50px] p-0 animate-fade-in font-semibold font-fredoka uppercase leading-10">
                    02
                  </div>
                  <div className="flex-col flex justify-start items-start gap-6">
                    <div className="flex-col w-full justify-start items-start gap-5 flex">
                      <div className="w-full gap-3">
                        <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                          {section.featuredText}{" "}
                        </span>
                        <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                          {section.title}
                        </span>
                      </div>
                      {/* <div className="w-full text-white animate-fade-in clarabodyTwo">
                          <p>{homeData[0].howItWorksOne}</p>
                        </div> */}
                      {section.BodyDescription?.map((desc, idx) => (
                        <p
                          className="w-full text-white animate-fade-in clarabodyTwo"
                          key={idx}
                        >
                          {desc.children[0]?.text}
                        </p>
                      ))}
                    </div>
                    <Link
                      href="/p/how-it-works#video"
                      rel="noopener noreferrer"
                      className="w-full h-12 "
                    >
                      <Link
                        href="/p/how-it-works"
                        className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton"
                      >
                        SHOW ME
                      </Link>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <Image
              alt="Kindi"
              src={CurveTwo}
              className="transform hidden md:hidden lg:flex -rotate-180 w-[56%] -mt-[130px] -mb-[20px]"
            />

            {/* Section Three */}
            {HIWSection?.slice(2, 3).map((section, index) => (
              <div
                key={index}
                className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4"
              >
                <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                  <div className="text-white text-6xl md:text-[50px] p-0 animate-fade-in font-semibold font-fredoka uppercase leading-10">
                    03
                  </div>
                  <div className="flex-col flex justify-start items-start gap-6">
                    <div className="flex-col w-full justify-start items-start gap-5 flex">
                      <div className="w-full gap-3">
                        <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                          {section.featuredText}{" "}
                        </span>
                        <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                          {section.title}
                        </span>
                      </div>
                      {/* <div className="w-full text-white animate-fade-in clarabodyTwo">
                          <p>{homeData[0].howItWorksOne}</p>
                        </div> */}
                      {section.BodyDescription?.map((desc, idx) => (
                        <p
                          className="w-full text-white animate-fade-in clarabodyTwo"
                          key={idx}
                        >
                          {desc.children[0]?.text}
                        </p>
                      ))}
                    </div>
                    <Link
                      href="/p/how-it-works#video"
                      rel="noopener noreferrer"
                      className="w-full h-12 "
                    >
                      <Link
                        href="/p/how-it-works"
                        className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton"
                      >
                        SHOW ME
                      </Link>
                    </Link>
                  </div>
                </div>
                <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
                  {/* <Image
                      alt="Kindi"
                      width={100}
                      height={100}
                      src={homeData[0]?.hiwOne?.url}
                      className="w-full h-full object-contain"
                    /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
