import clsx from "clsx";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

import styles from "./text-input.module.scss";

const TextInput = ({
  className,
  type = "text",
  placeholder,
  name,
  control,
  onChange,
  multiline,
  defaultValue,
  rows,
  cols,
  error,
  size,
  variant = "outlined",
}) => {
  const { field } = useController({ control, name, defaultValue: "" });

  return (
    <div>
      <TextField
        error={!!error}
        multiline={multiline}
        defaultValue={defaultValue}
        rows={rows}
        cols={cols}
        size={size}
        label={placeholder}
        variant={variant}
        type={type}
        onChange={onChange}
        {...field}
        value={field.value ? field.value : ""}
        className={clsx(className, styles.main_input)}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default TextInput;
