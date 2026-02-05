import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function CloseButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white p-0.5 shadow-lg",
        className,
      )}
      aria-label="Close"
    >
      <X size={24} strokeWidth={1} color="black" />
    </button>
  );
}
