import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { MoreHorizontal ,MoreVertical  } from 'lucide-react';

interface DropdownProps {
  children: ReactNode;
  right?: boolean | number;
  left?: boolean| number;
  className?: string;
  position?:any
  top?:boolean | number
  bottom?:boolean| number
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  right = false,
  left = false,
  className,
  top=false,
  bottom=false
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!dropdown.current || !trigger.current) return;

      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }

      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close on ESC
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!dropdownOpen || event.key !== "Escape") return;
      setDropdownOpen(false);
    };

    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative flex">
      <button
      title="button"
        ref={trigger}
        type="button"
        className={className ?? "text-[#3a3b3b] hover:text-body"}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
       {/*  <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.25 11.25C3.49264 11.25 4.5 10.2426 4.5 9C4.5 7.75736 3.49264 6.75 2.25 6.75C1.00736 6.75 0 7.75736 0 9C0 10.2426 1.00736 11.25 2.25 11.25Z" />
          <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" />
          <path d="M15.75 11.25C16.9926 11.25 18 10.2426 18 9C18 7.75736 16.9926 6.75 15.75 6.75C14.5074 6.75 13.5 7.75736 13.5 9C13.5 10.2426 14.5074 11.25 15.75 11.25Z" />
        </svg> */}
       {/*  <MoreHorizontal></MoreHorizontal> */}
       <MoreVertical></MoreVertical>
      </button>

      <div
        ref={dropdown}
        className={`absolute bottom-4 z-40  space-y-1 rounded-lg border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark
          ${left ? "left-5" : ""}
          ${right ? "right-5" : ""}
          ${top ? `top-[${top}px]` : ""}
          ${bottom ? `top-[${bottom}px]`: ""}
          ${dropdownOpen ? "block" : "hidden"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
