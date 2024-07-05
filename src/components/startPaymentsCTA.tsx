import { ChevronRight } from "lucide-react";

const StartPaymentsCTA = () => {
  return (
    <div className="bg-white w-full border-t-[3px] border-lloyds-green flex flex-row justify-between shadow-sm">
      <div className="flex flex-row gap-1.5 p-2 items-center md:px-16">
        {/* <Image
        src={props.image}
        height={props.height}
        width={props.width}
        alt={props.title}
      /> */}
        <div className="flex flex-col p-4 gap-2 md:px-16">
          <span className="text-lloyds-green font-semibold text-xl text-center">
            Start Accepting Payments Now
          </span>
          <span className="text-md text-gray-500 text-sm ">
          We've got lots of ways for your business to take payments in person, whether you're out making deliveries or working in store.
          </span>
        </div>
      </div>

      <div className="flex flex-col bg-slate-100 self-stretch">
        <a
          href="/signup"
          className="h-full flex flex-row justify-between p-2 min-w-48 items-center bg-lloyds-light-green hover:cursor-pointer animate-pulse"
        >
          <span className="text-white text-lg">Complete Setup</span>
          <ChevronRight className="text-white size-6" />
        </a>
      </div>
    </div>
  );
};

export default StartPaymentsCTA;
