import { ChevronDown, LockIcon } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full h-16 flex flex-row bg-lloyds-green justify-between px-6">
      <div className="flex flex-row">
        <Image src={"/logo.svg"} height={200} width={150} alt="lloyds logo" />
        <div className="flex items-center pl-6">
          <span className="text-white text-sm">Our Products & Services</span>
          <ChevronDown className="text-white size-4 ml-2" />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex items-center mr-6">
          <span className="text-white">Cookie Policy</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-evenly py-2 pr-2">
            <span className="text-white text-right">Safe & Secure</span>
            <span className="text-white text-xs">
              Our Internet Banking Guarantee
            </span>
          </div>
          <LockIcon className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
