// TODO Change button colors

import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  small?: boolean;
  green?: boolean;
  red?: boolean;
  disabled?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  small = false,
  green = false,
  red = false,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
  const colorClasses = green
    ? "bg-green-500 hover:bg-green-400 focus-visible:bg-green-400"
    : red
    ? "bg-red-500 hover:bg-red-400 focus-visible:bg-red-400"
    : "bg-gray-400  focus-visible:bg-gray-300 cursor-default";

  return (
    <button
      className={`mx-2 rounded text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      disabled={disabled}
      {...props}
    ></button>
  );
}
