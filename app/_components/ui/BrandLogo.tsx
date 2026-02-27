import Logo from "@/public/brand-logo.png";
import Text from "@/public/brand-text.png";

import Image from "next/image";

export default function BrandLogo() {
  return (
    <div>
      <Image
        className="h-8 w-8"
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={Logo}
        loading="eager"
        alt="Brand Logo"
      />
    </div>
  );
}
