"use client";

import { Button } from "@/components/ui/button";
import {
  CheckVector,
  SlideGrow,
  SlideLearn,
  SlideMain,
  SlidePlay,
  SlideThrive,
} from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SimpleLine = ({ SlideTitle = "Educational play for young children" }) => {
  return (
    <div className="w-full justify-start items-center gap-2.5 inline-flex">
      <div className="w-3 h-3 flex flex-col justify-center items-start">
        <Image
          alt="Kindi"
          src={CheckVector}
          className="w-3  h-3 text-[#ffffff] rounded-full"
        />
      </div>
      <div className="w-full text-[#3f3a64]  text-sm font-semibold font-montserrat">
        {SlideTitle}
      </div>
    </div>
  );
};

const slides = [
  {
    image: SlidePlay,
    script: "Early Years Learning with Added Fun",
    heading: "Play",
    description:
      "At Kindi, we provide adults with the necessary tools to nurture toddlers effectively, maximising each day of brain growth in early years children, eliminating uncertainty, worry, and time constraints. We've curated a comprehensive programme of activities meticulously designed to stimulate cognitive, social, emotional, and physical development through easy-to-follow expert daily guided play activities, unlocking every child's full potential and providing a strong foundation for lifelong success.",
    backgroundColor: "FF8E00",
    textcolor: "FF8E00",
  },

  {
    image: SlideLearn,
    script: "Education for Everyone",
    heading: "Learn",
    description:
      "We understand that each child is unique, with their own pace and path of learning. That's why our platform goes beyond a one-size-fits-all approach, offering a dynamic and customizable experience for every child. Guided by our platform, carers are empowered to target different learning outcomes for each child, ensuring that every interaction becomes a rich and meaningful learning experience regardless of age and stage. Helping carers navigate the complexities of early childhood development with confidence and ease.",
    backgroundColor: "F05C5C",
    textcolor: "F05C5C",
  },

  {
    image: SlideThrive,
    script: "Vital Brain Development through Early Learning",
    heading: "Thrive",
    description:
      "Unlocking lifelong success begins with prioritising early brain development. Our program not only significantly enhances academic achievement in higher education but also fosters long-term success and happiness. By nurturing cognitive abilities, emotional intelligence, and social skills early on, we empower children to thrive in various aspects of life, ensuring enduring happiness and achievement. Equipping children with the skills necessary to navigate challenges and seize opportunities with confidence and resilience. ",
    backgroundColor: "C42797",
    textcolor: "C42797",
  },
  {
    image: SlideGrow,
    script: "Early Years Learning Tools ",
    heading: "Grow",
    description:
      "Stay updated on your child's development compared to the national average and monitor their progress effortlessly with our ‘Milestone Tracker’. This invaluable tool empowers adults to identify and bolster areas of strength in children, while also providing guidance where additional support may be needed. With customisable features and insightful analytics, our tracker ensures every child receives the tailored attention they deserve on their developmental journey.",
    backgroundColor: "019ACF",
    textcolor: "019ACF",
  },
  {
    image: SlideMain,
    script: "The Best Start for your Children",
    heading: (
      <div className="w-full">
        <span className="text-[#3f3a64] claraheading capitalize ">
          Screen-Free, Play-Based{" "}
        </span>
        <span className="text-white claraheading capitalize ">
          Early Learning Activities
        </span>
      </div>
    ),
    description: (
      <>
        <div className="w-full">
          <div className="w-full text-white text-[20px] leading-[24px] font-medium font-fredoka">
            Screen-free educational games and play-related activities — designed
            by real teachers and early learning experts to make the most of
            those crucial formative years.
          </div>
          <div className="w-full gap-2 py-6 grid grid-cols-1 md:grid-cols-2">
            <SimpleLine SlideTitle="Educational play for young children" />
            <SimpleLine SlideTitle="Top tips / hacks from real teachers" />
            <SimpleLine SlideTitle="Individual and group learning activities" />
            <SimpleLine SlideTitle="Step-by-step guides for adults" />
            <SimpleLine SlideTitle="Curriculum-based" />
            <SimpleLine SlideTitle="Monthly planning themes" />
            <SimpleLine SlideTitle="Mixed-age learning made easy" />
            <SimpleLine SlideTitle="Screen-free learning" />
          </div>
        </div>
      </>
    ),
    backgroundColor: "EEBA00", // or any other tailwind background color class
    textcolor: "EEBA00",
  },
];

export default function Slider() {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false); // Manage touch state

  let touchStartX = 0;
  let touchEndX = 0;
  let startX = 0;
  let moveX = 0;
  let isDragging = false;

  const handleTouchStart = (e) => {
    setIsTouched(true); // Show touch indication
    touchStartX = e.touches[0].clientX;
    startX = e.touches[0].clientX;
    isDragging = true;
    document.body.classList.add("draggable");
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
    if (!isDragging) return;
    moveX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsTouched(false); // Hide touch indication
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (touchStartX - touchEndX < -50) {
      // Swipe right
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
    touchStartX = 0;
    touchEndX = 0;
    document.body.classList.remove("draggable");
    if (!isDragging) return;
    isDragging = false;
    if (startX - moveX > 50) {
      // Swipe left
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (startX - moveX < -50) {
      // Swipe right
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 3000);

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }
    }, 6000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isHovered, slides.length]);

  const handleMouseDown = (e) => {
    startX = e.clientX;
    isDragging = true;
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    moveX = e.clientX;
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    if (startX - moveX > 50) {
      // Swipe left
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (startX - moveX < -50) {
      // Swipe right
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <>
      <section
        className={`w-full h-auto cursor-grab bg-purple py-12 md:pt-16 md:pb-4 items-center justify-center flex flex-col gap-[20px] `}
        style={{
          backgroundColor: `#${slides[currentSlide].backgroundColor}`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="claracontainer w-full flex flex-col-reverse md:flex-col-reverse md:justify-center md:items-center lg:flex-row-reverse xl:flex-row-reverse gap-8 md:gap-8">
          <button
            onClick={handlePrevSlide}
            className=" w-[32px] h-[32px] hidden lg:flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          >
            <ChevronRight />
          </button>
          {/* Left Column */}
          <div className="h-auto w-full flex-col px-4 md:px-2 lg:px-4 justify-start items-start gap-6 md:gap-8 lg:gap-10 xl:gap-12 inline-flex  ">
            <div className="w-full flex flex-col justify-start items-start h-auto gap-4">
              <div className={`text-white clarascript   `}>
                {slides[currentSlide].script}
              </div>
              <div className="flex flex-col w-full justify-start items-start gap-4">
                <div className="w-auto">
                  <span className="text-white claraheading">
                    {slides[currentSlide].heading}
                  </span>
                </div>
                <div className="w-full h-auto text-white clarabodyTwo">
                  {slides[currentSlide].description}
                </div>
              </div>
            </div>
            <div className="w-auto">
              <Button
                className={`bg-white py-4 hover:bg-red hover: text-white clarabutton font-medium px-8 md:px-12 border-2 border-[#${slides[currentSlide].backgroundColor}] rounded-[10px]`}
                disabled={!loaded}
                style={{
                  color: `#${slides[currentSlide].textcolor}`,
                }}
              >
                Get Started{" "}
              </Button>
            </div>
          </div>
          {/* Right Column */}
          <div className="w-full slide-in-from-left-2 duration-200 md:min-w-[300px] md:w-[300px] lg:w-full flex justify-center items-center h-auto ">
            <Image
              alt="Kindi"
              src={slides[currentSlide].image}
              className="w-full md:min-w-[300px] md:w-[300px] lg:w-full lg:h-full lg:min-h-[400px] max-h-[400px] object-contain"
              onLoad={() => setLoaded(true)}
            />
          </div>
          <button
            onClick={handleNextSlide}
            className=" w-[32px] h-[32px] hidden lg:flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          >
            <ChevronLeft />
          </button>
        </div>

        {/* Dot Navigation */}
        <div className="flex w-full px-4 justify-between items-center">
          <button
            onClick={handlePrevSlide}
            className="w-[32px]  h-[32px] lg:hidden flex justify-center items-center left-0  transform   bg-opacity-30 backdrop-blur-lg text-[#f6f6f6] p-2 rounded-full z-10"
          >
            <ChevronLeft />
          </button>
          <div className="flex cursor-pointer justify-center w-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-2 h-2 bg-gray-300 rounded-full mx-2 ${
                  currentSlide === index ? "bg-white" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <button
            onClick={handleNextSlide}
            className="w-[32px] h-[32px] lg:hidden flex justify-center items-center right-0  transform bg-opacity-30 backdrop-blur-lg text-[#d6d6d6] p-2 rounded-full z-10"
          >
            <ChevronRight />
          </button>
        </div>
      </section>
    </>
  );
}

// export default function Slider() {
//   const [sliderData, setSliderData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSliderData = async () => {
//       try {
//         const response = await fetch(
//           "https://upbeat-life-04fe8098b1.strapiapp.com/api/slider?populate=Content.Media"
//         );
//         const data = await response.json();

//         if (response.ok) {
//           setSliderData(data.data.Content);
//         } else {
//           setError("Error fetching data");
//         }
//       } catch (error) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSliderData();
//   }, []);

//   console.log("Slider Data", sliderData);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//       <section className="w-full h-auto cursor-grab  items-center justify-center flex flex-col gap-[20px] bg-purple">
//         <div className=" w-full bg-purple flex flex-col-reverse md:justify-center md:items-center py-0  gap-8 md:gap-8">
//           <Carousel className="w-full flex py-0 my-0 justify-center items-center">
//             <CarouselContent className="w-full ml-0 p-0 flex justify-center items-center">
//               {sliderData?.map((item) => (
//                 <CarouselItem
//                   tyle={{ backgroundColor: item.bgcolor || "purple" }}
//                   key={item.id}
//                   className="min-w-full justify-center  shrink-0 grow-0 basis-full flex p-0  items-center"
//                 >
//                   <div className="w-full max-w-full claracontainer  md:min-w-[300px] md:w-[300px] lg:w-full flex flex-col  lg:flex-row justify-between items-center h-auto ">
//                     {item?.Media && item?.Media[0]?.url ? (
//                       <img
//                         // src={`https://upbeat-life-04fe8098b1.strapiapp.com${item.Media[0]?.url}`}
//                         src={SlideGrow}
//                         alt={item?.Title}
//                         className="w-full md:min-w-[300px] md:w-[300px] lg:w-full lg:h-full lg:min-h-[400px] max-h-[400px] object-contain"
//                       />
//                     ) : (
//                       <Image
//                         src={SlideGrow}
//                         // className="w-full md:min-w-[300px] md:w-[300px] lg:w-full lg:h-full lg:min-h-[400px] max-h-[400px] object-contain"
//                         alt={item?.Title}
//                       />
//                     )}

//                     <div className="h-auto max-w-[400px] lg:min-w-[700px] lg:max-w-full w-full flex-col px-4 md:px-2 lg:px-4 justify-start items-start gap-6 md:gap-8 lg:gap-10 xl:gap-12 inline-flex  ">
//                       <div className="w-fit flex flex-col justify-start items-start h-auto gap-4">
//                         <div className={`text-white clarascript   `}>
//                           {item.featuredText}
//                         </div>
//                         <div className="flex flex-col w-fit justify-start items-start gap-4">
//                           <span className="text-white w-full claraheading">
//                             {item.Title}
//                           </span>

//                           <div className="w-full max-w-full h-auto prose text-white clarabodyTwo">
//                             <p
//                               dangerouslySetInnerHTML={{ __html: item.Body }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="w-auto">
//                         <Button
//                           className={`bg-white py-4 hover:bg-red hover: text-white clarabutton font-medium px-8 md:px-12 border-2  rounded-[10px]`}
//                           // style={{
//                           //   color: `#${slides[currentSlide].textcolor}`,
//                           // }}
//                         >
//                           Get Started{" "}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="text-black" />
//             <CarouselNext className="text-black" />
//           </Carousel>
//         </div>
//       </section>
//     </>
//   );
// }
