import { useState } from "react";

export default function Error({message}) {
    const [isHide, setIsHide] = useState(false);
    return (
        <div className={`w-full ${isHide ? "hidden" : "flex"} items-center justify-between h-10 max-w-7xl mx-auto p-2 text-red-700 bg-red-100 col-span-12`}>
            {message}
            <span className="text-red-400 cursor-pointer w-[25px] h-[25px] border-[1px] border-[red] rounded-[50%] flex items-center justify-center " onClick={()=> setIsHide(true)}>
        X
      </span>
        </div>
    );
}
