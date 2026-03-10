import { LuX } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export function CloseButton({ ...props }) {
  // console.log("CloseButton props:", props.className);
  return (
    <button
      {...props}
      className={twMerge(
        "top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-(--colorNeutralBorder) bg-(--colorNeutralSurface) text-(--colorNeutralSecondary) shadow-sm transition-colors hover:bg-(--colorWhite)",
        props.className,
      )}
    >
      <LuX size={24} strokeWidth={1.75} />
    </button>
  );
}
