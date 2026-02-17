import Logo from "@/public/brand-logo.png";
import Text from "@/public/brand-text.png";

import Image from "next/image";

export default function BrandLogo() {
  return (
    <div>
      <Image className="h-8 w-8" src={Logo} alt="Brand Logo" />
    </div>
  );
}
