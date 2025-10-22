type ButtonProps = {
  children?: string;
  variant: "underline" | "filled";
  onClick?: () => void;
};
export const Button = ({ children, variant, onClick }: ButtonProps) => {
  let variantStyling = "";
  if (variant === "underline") {
    variantStyling = "bg-transparent text-white hover:underline";
  } else if (variant === "filled") {
    variantStyling = "bg-blue-600 text-white hover:bg-blue-700 p-2 rounded";
  }
  return (
    <button className={`${variantStyling}`} onClick={onClick}>
      {children}
    </button>
  );
};
