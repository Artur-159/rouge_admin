import clsx from "clsx";
import { useController } from "react-hook-form";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import styles from "./main-textarea.module.scss";

const MainTextarea = ({
  className,
  type,
  placeholder,
  name,
  control,
  onChange,
  multiline,
  defaultValue,
  rows,
  cols,
  error,
}) => {
  const { field } = useController({ control, name, defaultValue: "" });

  return (
    <div>
      <TextareaAutosize
        error={error}
        multiline={multiline}
        defaultValue={defaultValue}
        minRows={rows}
        cols={cols}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        {...field}
        className={clsx(
          className,
          error ? styles.main_textarea_error : styles.main_textarea
        )}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default MainTextarea;
