import { LuX } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export default function CloseButton({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={twMerge(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--colorNeutralBorder) bg-(--colorNeutralSurface) text-(--colorNeutralSecondary) shadow-sm transition-colors hover:bg-(--colorWhite)",
        className,
      )}
      {...props}
    >
      <LuX size={18} strokeWidth={1.75} />
    </button>
  );
}
