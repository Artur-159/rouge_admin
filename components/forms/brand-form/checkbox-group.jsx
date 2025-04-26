import MainCheckbox from "../../checkbox/checkbox"; 

const CheckboxGroup = ({ items, control, className, checked }) => {
  return (
    <div className={className}>
      {items?.map((item) => (
        <div key={item.name}>
          <MainCheckbox
            id={item.name}
            type="checkbox"
            name={item.name}
            control={control}
            text={item.label}
            className={item.checkboxClassName}
            checked={checked ? checked[item.name] || false : null}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
