import * as React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [maskInput, setMaskInput] = useState(true);

    return (
      <div className="relative">
        <input
          type={type === "password" ? (maskInput ? "password" : "text") : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800",

            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <span
            onClick={() => setMaskInput(!maskInput)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {maskInput ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
