import MainCheckbox from "../../checkbox/checkbox";
import styles from "../../../pages/product/product.module.scss";

const CheckboxGroup = ({ items, control, className, checked }) => {
  return (
    <div className={className}>
      {items?.map((item) => (
        <div className={styles.checkbox} key={item.name}>
          <MainCheckbox
            type="checkbox"
            control={control}
            text={item.label}
            name={item.name}
            checked={checked ? checked[item.name] || false : null}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
