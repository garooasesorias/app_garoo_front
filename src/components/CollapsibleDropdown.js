import React, { useState } from "react";

function CollapsibleDropdown({ buttonText, icon, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown"
        data-collapse-toggle="dropdown"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {buttonText}
      </button>
      <ul
        id="dropdown"
        className={`${isOpen ? "block" : "hidden"} py-2 space-y-2`}
      >
        {children}
      </ul>
    </div>
  );
}

export default CollapsibleDropdown;
