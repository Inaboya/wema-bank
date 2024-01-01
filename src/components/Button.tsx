import classNames from "classnames";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Loading from "../assets/icons/loading";

type ButtonProps = {
  children: React.ReactNode;
  btnType?: "withbg" | "withoutbg" | "outline" | "outline-red";
  fullWidth?: boolean;
  className?: string;
  border?: boolean;
  animate?: boolean;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    btnType,
    fullWidth,
    children,
    border,
    animate,
    className,
    loading,
    ...rest
  } = props;

  const withoutbg = btnType === "withoutbg";
  const outline = btnType === "outline";
  const outlineRed = btnType === "outline-red";
  return (
    <button
      type="button"
      ref={ref}
      className={classNames(
        "flex transform items-center justify-center py-3 px-4 font-medium focus:outline-none disabled:opacity-50",

        { "duration-200 hover:-translate-y-1 focus:translate-y-1": animate },
        { "rounded-lg border border-gray-300": border },
        withoutbg
          ? "bg-transparent text-black"
          : outline
          ? "rounded-md border border-[#D0D5DD] bg-transparent text-black "
          : outlineRed
          ? "rounded-md border border-red-500 bg-transparent text-red-600"
          : "rounded-lg  bg-black  text-white shadow-md",
        rest.disabled ? "cursor-not-allowed" : "",
        { [className as string]: className },
        { "w-full": fullWidth }
      )}
      {...rest}
    >
      {loading ? (
        <>
          <Loading className="mr-3 animate-spin" /> Please wait
        </>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
