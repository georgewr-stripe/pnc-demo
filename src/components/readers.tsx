import { ChevronRight, Zap } from "lucide-react";
import Image from "next/image";

export interface ReaderInfo {
  title: string;
  description: string;
  image: string;
  height: number;
  width: number;
  specs: string[];
  tag: string;
  cta_text: string;
}

const Readers = (props: ReaderInfo) => {

    return (
    <div className="bg-white w-full border-t-[3px] border-pnc-blue flex flex-row justify-between shadow-sm">
      <div className="flex flex-row gap-1.5 p-2 items-center h-full md:px-16">
        <Image
          src={props.image}
          height={props.height}
          width={props.width}
          alt={props.title}
        />
        <div className="flex flex-col p-4 gap-2 md:px-16">
          <span className="text-pnc-blue font-semibold text-xl text-center">
            {props.title.toUpperCase()}
          </span>
          <span className="text-md text-gray-500 text-sm ">
            {props.description}
          </span>
        </div>
      </div>

      <div className="flex flex-col bg-slate-100 grow">
        {props.specs.map((spec, _) => (
          <div key={_} className="border-b-2 border-white flex flex-row justify-between p-2 min-w-48 items-middle grow">
            <Zap className="text-pnc-blue size-4" />
            <span className="text-sm text-pnc-blue">{spec}</span>
          </div>
        ))}
        <div className="bg-pnc-blue border-b-2 border-white flex flex-row justify-between p-2 min-w-48 items-middle">
          <span className="text-white text-pnc-white">{props.tag}</span>
        </div>
        <a href="/dashboard/payments" className="flex flex-row justify-between p-2 min-w-48 items-center bg-pnc-light-blue hover:cursor-pointer animate-pulse">
          <span className="text-white">{props.cta_text}</span>
          <ChevronRight className="text-white size-4" />
        </a>
      </div>
    </div>
  );
};

export default Readers;
