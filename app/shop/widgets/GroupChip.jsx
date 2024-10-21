// function Chip({ children, active, onClick }) {
//   return (
//     <div
//       className={`${
//         active ? "bg-red  text-white" : "text-red bg-[white]"
//       } px-4 py-1 rounded-full min-w-[max-content] cursor-pointer`}
//       onClick={onClick}
//     >
//       {children}
//     </div>
//   );
// }

const GroupChip = ({ options, selectedOption, onChange }) => {
  return (
    <>
      <div className="flex overflow-x-scroll scrollbar-hidden space-x-2">
        {options.map((option, index) => (
          <div
            className={`${
              active ? "bg-red  text-white" : "text-red bg-[white]"
            } px-4 py-1 rounded-full min-w-[max-content] cursor-pointer`}
            key={index}
            active={option === selectedOption}
            onClick={() => onChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupChip;
