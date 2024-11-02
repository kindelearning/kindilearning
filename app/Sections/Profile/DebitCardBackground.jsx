export default function DebitCard({ cardName, cvv, cardNumber, expiary }) {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/Images/DebitCardBackground.svg')",
        }}
        className="flex flex-col p-4 items-end justify-between gap-2 min-h-[200px] max-w-[342px] overflow-clip min-w-[340px] w-full h-full object-cover"
      >
        <div></div>
        <div className="w-full flex flex-col justify-between items-start">
          <div className="text-[#f05c5c] text-start w-full items-start justify-start text-2xl font-semibold font-fredoka leading-loose">
            {cardName}
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="opacity-90 text-black text-sm font-normal font-fredoka leading-tight">
              {cardNumber}
            </div>
            <div className="opacity-90 text-black text-sm font-normal font-fredoka leading-tight">
              {expiary}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
