import { useState, useRef, useEffect } from "react";
import Transition from "./Transition";

interface Align {
  align: string;
}
function Notifications({ align }: Align) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current?.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (keyCode: KeyboardEvent | number) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${
          dropdownOpen && "bg-slate-200"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="25"
          viewBox="0 0 21 25"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.5805 19.7253C20.5805 19.7253 20.6137 19.7579 20.6137 19.7904C20.9065 20.4298 20.9065 20.9715 20.6137 21.4214C20.354 21.8684 19.8317 22.1229 19.1463 22.1555H19.1131H13.603C13.44 23.7539 12.0723 25 10.4087 25C8.74815 25 7.37743 23.7539 7.21439 22.1555H1.70431C0.985747 22.0933 0.463426 21.8684 0.203763 21.4214C-0.0891279 20.9715 -0.0558998 20.4298 0.236957 19.7579L0.270151 19.7253C2.29002 16.1763 2.32321 10.9342 2.32321 10.869C2.32321 7.67228 4.27965 4.92243 7.05131 3.67629V2.36504C7.05131 1.05375 8.12618 0 9.46368 0H11.7462C13.0837 0 14.1586 1.05375 14.1586 2.36504V3.83614C16.734 5.14739 18.4942 7.76994 18.5274 10.7743V10.869C18.5274 10.9342 18.5576 16.1437 20.5805 19.7253ZM9.49388 1.15145C8.80852 1.15145 8.2862 1.69609 8.2862 2.33543L8.28923 3.23235C8.59348 3.14118 8.9267 3.08097 9.26183 3.02041L9.33387 3.00738H9.40029C9.46522 3.00738 9.53845 2.99924 9.61167 2.99109C9.68488 2.98295 9.75809 2.97481 9.823 2.97481H9.95281C10.1159 2.94223 10.2789 2.94223 10.4419 2.94223C10.6382 2.94223 10.8344 2.94223 10.9975 2.97481H11.1273C11.3205 2.97481 11.5168 3.00735 11.713 3.03993C12.1357 3.10207 12.5584 3.19977 12.9509 3.32704V2.33543C12.9509 1.66352 12.3954 1.15145 11.7432 1.15145H9.49388ZM10.4389 23.816C9.42746 23.816 8.61228 23.0819 8.44924 22.1525H12.4286C12.2655 23.0819 11.4503 23.816 10.4389 23.816ZM19.1462 20.9715C19.4391 20.9389 19.6021 20.8768 19.6353 20.8116C19.6655 20.7495 19.6655 20.5897 19.5387 20.267C17.5158 16.6528 17.3527 11.7629 17.3527 10.9637V10.869C17.3527 8.15175 15.7224 5.78675 13.3372 4.73003H13.304C12.4556 4.34819 11.5408 4.15581 10.629 4.12323C9.71716 4.12323 8.80533 4.25053 7.92373 4.60276H7.89053C5.34834 5.59436 3.55491 8.02452 3.55491 10.8691C3.55491 11.091 3.49152 16.4309 1.33881 20.267C1.20899 20.5867 1.20899 20.7465 1.24218 20.8116C1.27538 20.8768 1.43842 20.9389 1.76451 20.9715H7.83014H13.0474H19.1462ZM8.93849 6.84348C9.10153 7.13059 9.03511 7.48282 8.74225 7.64266C8.7376 7.64722 8.72496 7.65679 8.70545 7.67157L8.70543 7.67158C8.44632 7.86784 6.97506 8.98219 6.88239 11.4788C6.88239 11.4965 6.88271 11.523 6.88314 11.5578L6.88314 11.5579C6.88879 12.0241 6.91247 13.9781 6.42649 16.2088C6.36007 16.496 6.13364 16.6884 5.84078 16.6884H5.71097C5.38488 16.6233 5.18865 16.3036 5.25507 15.9839C5.74419 13.6189 5.67777 11.5084 5.67777 11.5084V11.4759C5.80516 8.18206 7.94445 6.76654 8.11572 6.65322L8.12334 6.64815C8.38597 6.49121 8.74225 6.58594 8.93849 6.84348ZM5.18827 18.9587C5.54755 18.9587 5.8404 18.6716 5.8404 18.3193C5.8404 17.9671 5.54755 17.68 5.18827 17.68C4.82899 17.68 4.53613 17.9671 4.53613 18.3193C4.53613 18.6716 4.82899 18.9587 5.18827 18.9587Z"
            fill="#787678"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 11C19.2091 11 21 9.20914 21 7C21 4.79086 19.2091 3 17 3C14.7909 3 13 4.79086 13 7C13 9.20914 14.7909 11 17 11Z"
            fill="#E85652"
          />
        </svg>
        {/* <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-[#182235] rounded-full" /> */}
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full w-[150x] -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Notifications;
