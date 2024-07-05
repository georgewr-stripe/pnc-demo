import listReaders from "@/api/list_readers";
import { RefreshCcw } from "lucide-react";
import React from "react";
import Stripe from "stripe";

const ReaderList = () => {
  const [readers, setReaders] = React.useState<Stripe.Terminal.Reader[]>([]);
  const [loadingReaders, setLoadingReaders] = React.useState(true);

  React.useEffect(() => {
    listReaders().then((readers) => {
      setReaders(readers);
      setLoadingReaders(false);
    });
  }, []);

  if (loadingReaders) {
    return (
      <div className="flex flex-col items-center gap-4 text-lloyds-green">
        <RefreshCcw className="size-6 animate-spin" />
        <span>Loading Readers...</span>
      </div>
    );
  }

  return <div className="">
    
  </div>;
};

export default ReaderList;
