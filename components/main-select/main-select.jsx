import { useController } from "react-hook-form";
import Select from "react-select";
import clsx from "clsx";

import styles from "./main-select.module.scss";

const MainSelect = ({
  className,
  error,
  name,
  control,
  options,
  placeholder,
}) => {
  const {
    field: { onChange, value },
  } = useController({ control, name });

  return (
    <div>
      <Select
        className={clsx(className, styles.select)}
        placeholder={placeholder}
        value={options.find((el) => el.value === value)}
        options={options}
        onChange={onChange}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default MainSelect;
