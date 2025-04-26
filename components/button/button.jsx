import clsx from "clsx";
import Button from "@mui/material/Button";

import styles from "./button.module.scss";

const MainButton = ({
  children,
  className,
  onClick,
  color,
  autoFocus,
  variant,
  startIcon,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      color={color}
      autoFocus={autoFocus}
      className={clsx(className, styles.button)}
    >
      {children}
    </Button>
  );
};
export default MainButton;
