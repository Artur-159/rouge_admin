import { useController } from "react-hook-form";
import clsx from "clsx";

const MainCheckbox = ({
  name,
  control,
  checked,
  id = "",
  text = "",
  className = "",
}) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  });
  return (
    <label htmlFor={id} className={clsx(className)}>
      {text}:
      <input
        id={id}
        name={name}
        value={value}
        type="checkbox"
        control={control}
        onChange={onChange}
        checked={
          (value === 1) & checked ? true : value & !checked ? true : false
        }
      />
    </label>
  );
};

export default MainCheckbox;
