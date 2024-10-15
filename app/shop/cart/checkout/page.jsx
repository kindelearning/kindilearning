"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { DeleteItem } from "@/public/Images";

const stripePromise = loadStripe(
  "pk_live_51NcT49CjBezv2y8r9rE0b8L5W37kGyDZ4ER8m3gCrcFJW0pA1C7P7goLmUx2yaAftCibKGcvwRuhEkDq6Mlymz7b00oBy7wN5m"
);

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  // const completeCheckout = async () => {
  //     const session = await response.json();
  //     console.log("Stripe Session:", session);

  //     if (response.ok && session.id) {
  //       const stripe = await stripePromise;
  //       const result = await stripe.redirectToCheckout({
  //         sessionId: session.id,
  //       });

  //       if (result.error) {
  //         alert(result.error.message);
  //       }
  //     } else {
  //       console.error("Error creating session:", session.error);
  //       alert(`Error: ${session.error || "Failed to initiate checkout."}`);
  //     }
  //   } catch (error) {
  //     console.error("Error during checkout:", error);
  //     alert("An error occurred during checkout. Please try again.");
  //   }
  // };
  const completeCheckout = async () => {
    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        console.error("Failed to create checkout session:", response.statusText);
        alert("Failed to create checkout session. Please try again.");
        return;
      }
  
      const session = await response.json();
      console.log("Stripe Session:", session);
  
      if (session.id) {
        const stripe = await stripePromise;
        if (!stripe) {
          console.error("Stripe instance not loaded");
          alert("Stripe is not initialized. Please refresh and try again.");
          return;
        }
  
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (result.error) {
          console.error("Stripe redirect error:", result.error.message);
          alert(result.error.message);
        }
      } else {
        console.error("Error creating session:", session.error);
        alert(`Error: ${session.error || "Failed to initiate checkout."}`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <>
      <section className="w-full h-screen py-24 bg-[rgb(234,234,245)] items-start justify-start lg:items-center lg:justify-center p-0 flex flex-col">
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Checkout
          </div>
        </div>
        <div className="claracontainer h-screen -mt-4 rounded-t-[12px] z-2 md:m-12  p-6 rounded-xl bg-[#eaeaf5] md:bg-[white] w-full flex flex-col overflow-hidden gap-4">
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <div className="text-red hidden justify-center items-center md:flex text-[32px] md:text-[44px] w-full text-center font-semibold font-fredoka capitalize leading-10">
              Checkout
            </div>
          </div>
          {/* <div className="flex gap-2 flex-col w-full justify-start items-start">
            {cart.map((item, index) => (
              <div key={index}>
                <div
                  className={`w-full h-5 top-[${
                    item.isTotal
                      ? 144
                      : 16 + (item.label === "Delivery fee" ? 28 : 0)
                  }px] justify-between items-center inline-flex`}
                >
                  <div className="text-[#0a1932] text-sm font-normal font-fredoka leading-tight">
                    {item.title}
                  </div>
                  <div className="text-right text-[#0a1932] text-sm font-normal font-fredoka leading-tight">
                    ${item.price}
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <div className="w-full flex min-h-[50vh] px-2 overflow-y-scroll scrollbar-hidden flex-col gap-2">
            {cart.map((item) => (
              <div key={item.id}>
                <div className="flex gap-4 px-2 py-2 bg-white rounded-xl items-center shadow w-full border-gray-200">
                  <Image
                    alt={item.title}
                    src={item.image}
                    width={120}
                    height={90}
                    className="w-[80px] h-[76px] md:w-[100px] lg:h-[80px] rounded-[12px]"
                  />
                  <div className="flex w-full justify-between items-start">
                    <div className="flex flex-col w-full gap-1 md:gap-2">
                      <h5 className="text-black text-lg font-fredoka font-medium leading-relaxed ">
                        {item.title}
                      </h5>
                    </div>
                    <div className="flex flex-col justify-end items-end w-full gap-2">
                      <div className="w-full text-red text-3xl text-end font-semibold font-fredoka capitalize leading-10">
                        ${item.price}
                      </div>
                      {/* <div className="w-full gap-[2px] flex justify-end items-center">
                        <button onClick={handleCheckout}>
                          <Image src={DeleteItem} />
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="shadow-upper rounded-t-[12px] bottom-0 z-24  sticky bg-[white] shadow py-4 flex flex-row justify-center w-full items-center gap-4">
          <div className="claracontainer px-4 w-full justify-between items-center flex">
            <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-2xl font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
              Back
            </Button>

            <Button
              onClick={completeCheckout}
              className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white"
            >
              Complete Purchase
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
{
  /* <Dialog className="w-full flex justify-center items-center">
  <DialogTrigger>
    <Button className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white">
      Proceed to Checkout
    </Button>
  </DialogTrigger>
  <DialogContent className="w-[92%] lg:max-w-[800px] bg-[#eaeaf5] lg:bg-[#ffffff] rounded-[8px] h-[600px]">
    <DialogHeader>
      <DialogDescription className="flex h-full flex-col gap-2 justify-center items-center w-full">
        <Image alt="Kindi" src={OrderConfirmed} className="w-12 h-12" />
        <div className="w-full text-center text-[#0a1932] text-[24px] lg:text-[40px] font-semibold font-fredoka leading-tight">
          Congratulation!
        </div>
        <div className="w-full text-center text-[#0a1932] text-[16px] lg:text-[24px] font-normal font-fredoka">
          Your order has been placed. Your order reference number is BRJ388290.
        </div>
        <Link
          href="/"
          className="text-center text-red text-[24px] font-medium font-fredoka leading-normal"
        >
          Go to Home{" "}
        </Link>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>; */
}

{
  /* <Accordion
    Data={<AddressForm />}
    trailingIcon={LocationIcon}
    title="Add Address"
/>
  <Accordion
    Data={<PaymentDetail />}
    trailingIcon={PaymentsIcon}
    title="Add Payment Method"
/> */
}
