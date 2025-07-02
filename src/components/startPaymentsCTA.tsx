import { ChevronRight } from "lucide-react";
import Image from 'next/image'

const StartPaymentsCTA = () => {
  return (
    <div className="bg-white w-full border-t-[3px] border-pnc-blue flex flex-row justify-between shadow-sm">
      <div className="flex flex-row gap-1.5 p-2 items-center md:px-16">
        {/* <Image
        src={props.image}
        height={props.height}
        width={props.width}
        alt={props.title}
      /> */}
              <Image src="/lloyds_ttp.png" height={200} width={150} alt="PNC TTP" />

        <div className="flex flex-col p-4 gap-2 md:px-16">
          <span className="text-pnc-blue font-semibold text-xl text-center">
            Start taking payments today
          </span>
          <span className="text-md text-gray-500 text-sm ">
          Set up an account and start taking payments same day. With pay as you go terms and no upfront fee, take payments simply using an app or payment link.          </span>
        </div>
      </div>

      <div className="flex flex-col bg-slate-100 self-stretch">
        <a
          href="/marketing"
          className="h-full flex flex-row justify-between p-2 min-w-48 items-center bg-pnc-light-blue hover:cursor-pointer animate-pulse"
        >
          <span className="text-white text-lg">Complete Setup</span>
          <ChevronRight className="text-white size-6" />
        </a>
      </div>
    </div>
  );
};

export default StartPaymentsCTA;
