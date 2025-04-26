import MainCheckbox from "../../checkbox/checkbox"; // Adjust the import path as needed

const CheckboxGroup = ({ items, control, className, checked }) => {
  return (
    <div className={className}>
      {items?.map((item) => (
        <div key={item.name}>
          <h4>{item.label}</h4>
          <MainCheckbox
            className={item.checkboxClassName}
            type="checkbox"
            control={control}
            name={item.name}
            checked={checked ? checked[item.name] || false : null}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
