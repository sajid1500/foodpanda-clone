import { LuX } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export function CloseButton({ ...props }) {
  // console.log("CloseButton props:", props.className);
  return (
    <button
      {...props}
      className={twMerge(
        "text-foreground hover:bg-accent absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border shadow-lg transition-colors",
        props.className,
      )}
    >
      <LuX size={24} strokeWidth={1.75} />
    </button>
  );
}
