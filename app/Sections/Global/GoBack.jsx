// import { useRouter } from "next/router";

import { ChevronLeft } from "lucide-react";

const GoBack = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button onClick={handleBack}>
      <ChevronLeft className="w-[42px] h-[42px] text-[#0a1932]" />
    </button>
  );
};

export default GoBack;
