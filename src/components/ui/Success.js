import { useState } from "react";

export default function Success({ message }) {
  const [isHide, setIsHide] = useState(false);
  return (
    <div className={`max-w-7xl col-span-12 w-full ${isHide ? "hidden" : "flex"} h-10 items-center justify-between mx-auto p-2 text-teal-700 bg-teal-100`}>
      {message}
      <span className="text-red-400 cursor-pointer w-[25px] h-[25px] border-[1px] border-[red] rounded-[50%] flex items-center justify-center " onClick={()=> setIsHide(true)}>
        X
      </span>
    </div>
  );
}
