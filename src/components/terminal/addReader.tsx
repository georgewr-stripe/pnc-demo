import { ChevronLeft } from "lucide-react";
import Modal from "../modal";

interface AddReaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddReader = (props: AddReaderProps) => {
  const { open, setOpen } = props;

  return (
    <Modal open={open} setOpen={setOpen} title="Add a Reader">
      <ChevronLeft
        className="size-6 cursor-pointer fixed left-4 top-4 text-lloyds-green"
        onClick={() => setOpen(false)}
      />

      <div className="flex flex-row justify-around"></div>
    </Modal>
  );
};

export default AddReader;
