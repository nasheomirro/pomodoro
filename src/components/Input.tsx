import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={twMerge(
        "p-1 max-w-full bg-transparent outline-none border-b focus:border-b-blue-500",
        className
      )}
    />
  );
});
