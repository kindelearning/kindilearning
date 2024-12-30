import { fetchChildDevelopmentUnlock } from "@/app/data/p/Home";
import { Button } from "@/components/ui/button";

export default async function PromotionalSection() {
  const content = await fetchChildDevelopmentUnlock();
  // console.log("Content:", content);
  console.log(content);
  if (!content) {
    return <p>No data available</p>;
  }
  const mediaUrl = content.media?.[0]?.url
    ? content.media[0].url
    : null;
  return (
    <>
      <section className="w-full h-auto bg-[#029871] items-center justify-center py-8 flex flex-col md:flex-row gap-[20px] transition-all duration-300 animate-fade-in">
        <div className="claracontainer py-4 px-4 md:px-2 lg:px-0 md:py-6 lg:py-12 w-full flex flex-col-reverse md:justify-center md:items-center lg:flex-row xl:flex-row overflow-hidden gap-8 animate-slide-up">
          <div className="w-full flex lg:min-w-[54%] lg:w-[50%] px-0 lg:px-4 flex-col button justify-start items-start h-auto transition-all duration-300 animate-expand">
            <div className="w-full flex flex-col justify-start  items-start h-auto gap-6 md:gap-6 script">
              <div className="text-white clarascript animate-fade-in">
                {content.featuredText}
              </div>

              <div className="flex flex-col w-full justify-start items-start heading /* gap-4 md:gap-6 lg:gap-7 xl:gap-8 */ animate-fade-in">
                <span className="text-white claraheading capitalize animate-fade-in">
                  {content.title || "No Title Available"}
                </span>
                <span className="w-full h-auto  text-white clarabodyTwo animate-fade-in">
                  <div dangerouslySetInnerHTML={{ __html: content.body }} />
                </span>
              </div>
            </div>
            <div className="w-auto hover:pl-[4px] duration-200 h-auto animate-fade-in">
              <Button className="bg-[#ffffff] hover:bg-red hover:text-white text-[#029871] clarabutton">
                Get Started
              </Button>
            </div>
          </div>

          <div className="w-full px-4 md:px-8 xl:px-12 md:w-[50%] flex justify-center items-center h-auto animate-fade-in">
            <div className="w-[400px] h-auto">
              <img
                src={content[0]?.Media }
                alt="Child Development"
                width={400}
                height={400}
                className="w-full object-cover"
              />
              {/* {content.Media ? (
                <></>
              ) : (
                <p className="text-white">No Media Available</p>
              )} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
