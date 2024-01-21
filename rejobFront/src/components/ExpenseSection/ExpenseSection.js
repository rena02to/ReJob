import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ExpandingSection = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        className="flex items-center shadow-md p-20 h-[150px] cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="text-customColor text-2xl font-bold w-full">
          {title}
        </span>
        {isExpanded ? (
          <IoIosArrowUp className="h-[15.44px]" />
        ) : (
          <IoIosArrowDown className="h-[15.44px]" />
        )}
      </div>
      <div>
        {isExpanded && <div className="h-[200px] bg-white">{content}</div>}
      </div>
    </>
  );
};

export default ExpandingSection;
