import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={twMerge(
        "disabled:opacity-70 disabled:cursor-not-allowed px-4 py-1.5 bg-stone-900",
        className
      )}
    />
  );
});
