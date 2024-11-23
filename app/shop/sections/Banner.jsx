export default function Banner() {
  return (
    <>
      <section className="w-full claracontainer h-full px-4 bg-[#EAEAF5] items-center justify-center py-2 flex flex-col md:flex-row gap-[20px]">
        <div
          style={{
            backgroundImage: "url('/Images/ShopBannerBG.svg')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
          className="claracontainer min-w-full min-h-[80px] items-center justify-between lg:min-h-[300px] px-4 md:px-2 lg:px-4 flex flex-row overflow-hidden gap-8"
        >
          <div className="flex flex-col items-start lg:max-w-[50%] justify-start py-4 lg:p-4 lg:pt-12 w-full">
            <div className=" text-white text-start text-[12px] leading-[16px] lg:text-4xl font-semibold font-fredoka">
              Imagination & educationunite one toy at a time
            </div>
            <div className="w-full font-fredoka text-[8px] leading-[10px] lg:text-2xl flex justify-start text-start text-white">
              Unlock joy, learn through play today!
            </div>
          </div>
          <div className="min-w-[40%] lg:min-w-[30%]">.</div>
        </div>
      </section>
    </>
  );
}
