import { ChevronDown, Home, LockIcon, Mail } from "lucide-react";

export interface NavBarProps {
  name: string;
  business_name: string;
}

const NavBar = (props: NavBarProps) => {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex flex-row h-18 w-full border-b-2 border-gray px-6 py-2 justify-between items-center">
        <div className="flex flex-col">
          <span>{props.name}</span>
          <div className="flex flex-row items-center">
            <LockIcon className="h-3 w-3 mr-1" />
            <span className="text-xs">
              {" "}
              Last logged in yesterday at 12:45 pm
            </span>
          </div>
        </div>
        <div>
          <span className="text-lloyds-dark-green">Log off</span>
        </div>
      </div>
      <div className="flex flex-row h-18 w-full border-b-2 border-gray px-6 py-2 justify-between items-center">
        <div>
          <span>{props.business_name}</span>
        </div>
        <div className="flex flex-row gap-6">
          <Home className="text-lloyds-dark-green" />
          <div className="flex flex-row">
            <span className="text-lloyds-dark-green">Your Accounts</span>
            <ChevronDown className="text-lloyds-dark-green" />
          </div>
          <div className="flex flex-row">
            <span className="text-lloyds-dark-green">Admin</span>
            <ChevronDown className="text-lloyds-dark-green" />
          </div>
          <div className="flex flex-row">
            <span className="text-lloyds-dark-green">Help & Support</span>
            <ChevronDown className="text-lloyds-dark-green" />
          </div>
          <Mail className="text-lloyds-dark-green" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
