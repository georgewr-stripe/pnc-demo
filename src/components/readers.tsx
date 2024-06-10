import { ChevronRight, Zap } from "lucide-react";
import Image from "next/image";

export interface ReaderInfo {
  title: string;
  image: string;
  height: number;
  width: number;
  description: string;
  tag: string;
  specs: string[];
}

const Readers = (props: ReaderInfo) => {
  return (
    <div className="bg-white w-full border-t-[3px] border-lloyds-green flex flex-col sm:flex-row justify-between shadow-sm">
      <div className="flex flex-row gap-1.5 p-2 items-center h-full">
        <Image
          src={props.image}
          height={props.height}
          width={props.width}
          alt={props.title}
        />
        <div className="flex flex-col p-4 gap-2">
          <span className="text-lloyds-green font-semibold text-xl text-center">
            {props.title.toUpperCase()}
          </span>
          <span className="text-md text-gray-500 text-sm ">
            {props.description}
          </span>
        </div>
      </div>

      <div className="flex flex-col bg-slate-100 grow">
        {props.specs.map((spec) => (
          <div className="border-b-2 border-white flex flex-row justify-between p-2 min-w-48 items-middle grow">
            <Zap className="text-lloyds-green size-4" />
            <span className="text-sm text-lloyds-green">{spec}</span>
          </div>
        ))}
        <div className="bg-lloyds-green border-b-2 border-white flex flex-row justify-between p-2 min-w-48 items-middle">
          <span className="text-white text-lloyds-white">{props.tag}</span>
        </div>
        <div className="flex flex-row justify-between p-2 min-w-48 items-middle bg-lloyds-light-green">
          <span className="text-white">Get started</span>
          <ChevronRight className="text-white size-4" />
        </div>
      </div>
    </div>
  );
};

export default Readers;
