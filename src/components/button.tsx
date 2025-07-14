import { LucideIcon } from "lucide-react";

interface ButtonProps {
  text: string;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  color?: "primary" | "secondary";
}

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${
        props.color === "secondary" ? "bg-pnc-light-blue" : "bg-pnc-orange"
      } text-white px-4 py-2 rounded-md cursor-pointer flex flex-row items-center justify-center`}
    >
      <span className="text-white mr-2">{props.text}</span>
      {props.icon && <props.icon className="text-white size-4" />}
    </button>
  );
};

export default Button;
