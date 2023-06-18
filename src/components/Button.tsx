import React from "react";

interface ButtonProps {
  primary: "primary" | "secondary" | "sub";
  backgroundColor?: string;
  size: "xsmall" | "small" | "medium" | "large";
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const Button = ({
  primary,
  active = true,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = active ? "button--active" : "button--inactive";
  return (
    <button
      type="button"
      className={["button", `button--${size}`, `button--${primary}`, mode].join(
        " "
      )}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};

export default Button;
