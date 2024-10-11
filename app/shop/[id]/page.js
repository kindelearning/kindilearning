import {
  ActivityImage,
  creditCard,
  ProductImage,
  PromotionalImage,
  Ratings,
  ShopImage,
} from "@/public/Images";
import { ProductGrid, ProductImages, ReviewGrid } from "..";
import Image from "next/image";
import { GroupChip, QuantityControl } from "..";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

// // const AnimatedButton = () => {
// //   const [isAnimating, setIsAnimating] = useState(false);
// //   const [text, setText] = useState("Share your Review");

// //   const handleButtonClick = () => {
// //     setIsAnimating(true);
// //     setTimeout(() => {
// //       setText("Done");
// //       setIsAnimating(false);
// //     }, 2000);
// //   };

// //   return (
// //     <div className="claracontainer w-full py-6 flex flex-col gap-4 justify-between items-center">
// //       <Button
// //         className={`w-[300px] flex flex-row gap-1 justify-center items-center bg-red rounded-[10px] shadow border-2 border-white ${
// //           isAnimating ? "animate-button" : ""
// //         }`}
// //         onClick={handleButtonClick}
// //       >
// //         <ArrowRight
// //           className={`transition-transform duration-2000 ${
// //             isAnimating ? "animate-arrow" : ""
// //           }`}
// //         />
// //         <span
// //           className={`transition-opacity duration-1000 ${
// //             isAnimating ? "opacity-80" : "opacity-100"
// //           }`}
// //         >
// //           Share your Review
// //         </span>
// //         <span
// //           className={`transition-opacity duration-1000 ${
// //             isAnimating ? "opacity-0" : "hidden"
// //           }`}
// //         >
// //           Done
// //         </span>
// //       </Button>
// //     </div>
// //   );
// // };

// export async function generateStaticParams() {
//   const uniqueParams = productData
//     .map((post) => ({
//       slug: slugify(post.title),
//     }))
//     .filter((value, index, self) => {
//       return self.findIndex((v) => v.slug === value.slug) === index;
//     });

//   console.log("Generated Params:", uniqueParams);
//   return uniqueParams;
// }

// export default async function Page({ params }) {
//   console.log("Received Params:", params);
//   if (!params || !params.id) {
//     return (
//       <main>
//         <h1>Params ID is null or undefined</h1>
//         <p>Please check routing configuration and generateStaticParams</p>
//       </main>
//     );
//   }

//   const post = productData.find((b) => slugify(b.title) === params.id);

//   if (!post) {
//     return (
//       <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
//         <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col md:flex-col lg:flex-row overflow-hidden gap-8">
//           <Image alt="Kindi" src={NotFoundImg} />
//           <div className="flex w-full flex-col justify-start items-start gap-4">
//             <div className="flex flex-col w-full justify-start items-start gap-4">
//               <div className="w-full">
//                 <span className="text-[#3f3a64] text-4xl font-normal font-fredoka leading-[45px]">
//                   404 Error!
//                   <br />
//                 </span>
//                 <span className="text-red text-4xl font-normal font-fredoka leading-[45px]">
//                   Opps... This page is taking a little nap!{" "}
//                 </span>
//               </div>
//             </div>
//             <div className="w-[460px] h-[203px]">
//               <span className="text-[#696969] text-lg font-semibold font-['Fredoka'] leading-[21px]">
//                 This page isn’t quite ready to play right now. While you’re
//                 here:
//                 <br />
//               </span>
//               <span className="text-[#696969] text-lg font-normal font-['Fredoka'] leading-[21px]">
//                 <br />
//               </span>
//               <span className="text-[#696969] text-lg font-normal font-['Fredoka'] leading-[21px]">
//                 Try searching for the page again
//                 <br />
//                 Return to our homepage, or
//                 <br />
//                 Take a quick detour to explore some fun activities for your
//                 toddler!
//                 <br />
//               </span>
//               <span className="text-[#696969] text-lg font-normal font-['Fredoka'] leading-[21px]">
//                 <br />
//               </span>
//             </div>
//             <p>Could not find requested resource</p>
//             <Link href="/">Return Home</Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

import { getProductById } from "@/lib/hygraph";
import NotFound from "@/app/not-found";

export default async function ProductDetailPage({ params }) {
  const { id } = params;

  const product = await getProductById(id);

  if (!product) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] lg:bg-[#eaeaf5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          {/* Row 1 */}
          <div className="flex w-full flex-col md:flex-col lg:flex-row xl:flex-row gap-8 justify-between items-start">
            {/* column1 */}
            {/* <div className="claracontainer min-w-[52%] flex flex-col gap-4 justify-center items-center w-full"> */}
            <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
              
              <ProductImages
                images={product.productImages.map((img) => img.url)}
              />
            </div>
            {/* col 2 */}
            <div className="claracontainer py-0 flex w-full flex-col lg:max-w-[48%] justify-between items-start gap-4">
              <div className="w-full hidden md:hidden lg:flex text-[#3f3a64] text-[32px] leading-normal font-semibold font-fredoka capitalize">
                {product.title}
              </div>
              <div className="claracontainer w-full flex md:flex lg:hidden xl:hidden flex-row p-0 justify-start items-start gap-1">
                {/* Product Title */}
                <div className="w-full flex md:flex lg:hidden xl:hidden text-[#0a1932] text-[28px] font-semibold font-['Fredoka'] leading-[30px]">
                  {product.title}
                </div>
              </div>
              {/* Product Pricing */}
              <div className="claracontainer w-full flex flex-row p-0 justify-start items-start gap-1">
                <div className="w-[max-content] text-red text-[40px] leading-[40px]  font-semibold font-fredoka ">
                  ${product.salePrice}
                </div>
                <div className="w-full text-gray-500 text-[24px] leading-[24px] font-semibold font-fredoka line-through ">
                  ${product.actualPrice}
                </div>
              </div>
              {/* ratings */}
              <div className="w-full flex gap-1 items-center claracontainer">
                <div className="flex gap-1">
                  <Image src={Ratings} alt="Rating" />
                  <Image src={Ratings} alt="Rating" />
                  <Image src={Ratings} alt="Rating" />
                  <Image src={Ratings} alt="Rating" />
                  <Image src={Ratings} alt="Rating" />
                </div>
                <div className="text-zinc-600 w-[max-content] text-sm font-medium font-fredoka leading-[20px]">
                  157 Reviews
                </div>
              </div>
              {/* COntent */}
              <div className="claracontainer">
                <div className="w-[max-content] text-[#0a1932] text-[32px] font-semibold font-fredoka leading-tight">
                  Description
                </div>
                <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description.html,
                    }}
                  />
                </div>
              </div>
              {/* variants */}
              <div className="claracontainer flex flex-col gap-1">
                <div className="w-[max-content] text-[#0a1932] text-[32px] font-semibold font-fredoka leading-tight">
                  Select Variant
                </div>
                {/* <GroupChip
                  options={options}
                  selectedOption={selectedOption}
                  onChange={handleOptionChange}
                /> */}
                To be added soon
              </div>
              {/* CTA */}
              <div className="claracontainer flex flex-col w-full gap-1">
                <div className="claracontainer w-full justify-between items-center flex flex-row gap-4">
                  <QuantityControl />
                  <Link className="w-full" href="/shop/cart">
                    <Button className="bg-red w-full rounded-[16px] border-2 border-[white]">
                      Add to Cart
                    </Button>
                  </Link>
                </div>
                <div className="claracontainer w-full justify-end items-end flex flex-row gap-4">
                  <div className="w-full flex flex-row justify-center items-center gap-2">
                    <Image alt="Kindi" src={creditCard} className="w-2 h-2" />
                    <div className="text-zinc-600 text-sm font-medium font-fredoka leading-[20px]">
                      100% Secured Payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex w-full flex-col justify-start items-center">
            <div className="text-[#0a1932] text-[20px] lg:text-[28px] font-semibold font-fredoka text-start w-full ">
              Recently Viewed
            </div>
            <ProductGrid />
          </div>
          {/* Row 3 - Reviews */}
          <div className="flex w-full flex-col justify-start items-center">
            <div className="flex justify-between w-full items-center">
              <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
                Customer Reviews
              </div>
              <Dialog className="w-full flex justify-center items-center">
                <DialogTrigger className="text-red w-full text-end text-xl font-semibold font-fredoka leading-none">
                  {" "}
                  Write a Review
                </DialogTrigger>
                <DialogContent className="claracontainer w-full rounded-[24px] gap-6 min-h-[600px] justify-start items-start px-4">
                  <DialogHeader>
                    <DialogTitle>
                      {" "}
                      <div className="text-center text-red claraheading font-semibold capitalize ">
                        Write a Review
                      </div>
                    </DialogTitle>
                    <DialogDescription>
                      <div className="claracontainer w-full py-6 flex flex-row gap-4 justify-between items-start">
                        <Image
                          alt="Kindi"
                          src={ShopImage}
                          className="w-[260px] hidden lg:flex h-[200px]"
                        />
                        <div className="flex w-full flex-col gap-2 justify-start items-start claracontainer">
                          <div className="text-start text-[#3f3a64] text-[20px] lg:text-4xl font-semibold font-fredoka capitalize">
                            Wooden geometrical montessori puzzle
                          </div>
                          <div className="text-[#757575] text-[16px] lg:text-2xl text-start font-light font-fredoka">
                            Lorem ipsum dolor sit amet consectetur. At lectus
                            diam a sit aliquet sollicitudin sagittis
                            volutpat....
                          </div>
                          <div className="flex flex-col justify-start items-start w-full">
                            <div className="text-center text-red text-[12px] lg:text-[20px] font-bold font-['Montserrat']">
                              Give us Rating out of 5-Stars
                            </div>
                            <div className="flex gap-1">
                              <Image src={Ratings} alt="Rating" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="claracontainer w-full py-6 flex flex-col gap-2 justify-between items-start">
                        <div className="w-full text-[#3f3a64] text-2xl lg:text-4xl font-semibold text-start font-fredoka capitalize leading-10">
                          add your Comments
                        </div>{" "}
                        <Textarea
                          placeholder="Lorem ipsum dolor sit amet consectetur. In elementum in tempus massa tellus nullam nulla quis. Sed volutpat id mi ut diam. Faucibus lectus sit quam nascetur diam donec pharetra fermentum semper.."
                          className="w-full p-4 text=[#0f172a] py-4 text-start rounded-lg border-2 border-[#b4b4b4] justify-center items-center gap-2.5 inline-flex"
                        />
                      </div>
                      {/* <div className="claracontainer w-full py-6 flex flex-col gap-4 justify-between items-center">
                        <Button className="w-[300px] flex flex-row gap-1 justify-center items-center bg-red rounded-[10px] shadow border-2 border-white">
                          <ArrowRight />
                          Share your Review
                        </Button>
                      </div> */}
                      <Button>Drop Review</Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <ReviewGrid />
          </div>
          {/* Row 4 */}
          <div className="flex w-full flex-col justify-start items-center">
            <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
              You May also like
            </div>
            <ProductGrid />
          </div>
        </div>
      </section>
      {/* Row 5 - Sticky CTA Mobile */}
      <div className="flex w-full lg:hidden md:hidden flex-col justify-start items-center">
        <div className="claracontainer px-4 py-4 w-full bg-[#ffffff] rounded-t-[24px] shadow-upper sticky bottom-0 z-12 justify-between items-center flex flex-row gap-4">
          <QuantityControl />
          <Link className="w-full" href="/shop/cart">
            <Button className="bg-red w-full rounded-[16px] border-2 border-[white]">
              Add to Cart
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
