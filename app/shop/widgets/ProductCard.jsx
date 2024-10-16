import { Ratings } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ image, title, rating, price }) => {
  return (
    <div
      // href="/shop/slug"
      className="flex max-w-[300px] min-w-[240px] w-full flex-col rounded-[24px] items-center gap-4 bg-white  hover:shadow-md"
    >
      <div className="flex rounded-t-[24px] overflow-clip w-full">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="w-full hover:scale-110 duration-300 h-[200px] md:h-[260px] rounded-t-[24px] object-cover"
        />
      </div>
      <div className="claracontainer flex flex-col justify-start items-center w-full gap-2">
        <div className="flex items-center  px-4 w-full justify-between gap-2">
          <h1 className="flex text-[24px] leading-tight font-semibold text-[#0A1932] font-fredoka">
            $ {price || "29"}
          </h1>
          <div className="flex flex-row justify-center gap-[2px] items-center">
            <Image
              alt="Kindi"
              src={Ratings}
              className="text-yellow-400 w-4 h-4"
            />
            <span className="text-right text-[#0a1932] text-[18px] font-normal font-montserrat leading-none">
              {rating}
            </span>
          </div>
        </div>
        <h3 className="text-start text-[#0a1932] text-[10px] font-fredoka w-full px-4 pb-4 pt-2 text-base font-medium leading-[20px]">
          {/* {title.length > 50 ? `${title.substring(0, 47)}...` : title} */}
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
