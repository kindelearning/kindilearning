import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { getStandardPagesContent } from "@/lib/hygraph";

const Page = async () => {
  const standardPages = await getStandardPagesContent();
  // console.log("Standard Pages Content: ", standardPages);
  if (
    !standardPages ||
    !standardPages.qualityControl ||
    !standardPages.qualityControl.html
  ) {
    return <p>No content found</p>;
  }
  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                Kindi
              </span>{" "}
              <span className="text-red claraheading uppercase"> Quality</span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                Control
              </span>
            </div>

            <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              At <span className="font-semibold">Kindi</span> ,we blend
              cutting-edge technology with research-backed early childhood
              education practices to deliver a seamless, engaging, and effective
              learning experience for children, carers, and educators. Our
              platform is designed to provide easy access to carefully crafted
              play activities while ensuring a user-friendly experience for both
              parents and professionals. Below, we highlight the key
              technological features that power Kindi’s innovative approach to
              early childhood development.
            </span>
          </div>
          {/* The Divider */}
          <div className="h-[1.5px] bg-[black] rounded-full my-4" />
          <div className="items-center w-full justify-center flex flex-col gap-4">
            {standardPages?.qualityControl?.html ? (
              <div className="w-full text-gray-700 text-[20px] font-medium font-fredoka leading-[24px]">
                <RichTextRender content={standardPages?.qualityControl?.json} />
              </div>
            ) : (
              <p>No content found</p>
            )}
          </div>
         
        </div>
      </section>
    </>
  );
};

export default Page;
