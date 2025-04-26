import TextInput from "../../text-input/text-input";

const CoordinateInput = ({ control, errors }) => {
  return (
    <>
      <div>
        <h4>Coordinate x</h4>
        <TextInput
          control={control}
          name="coordinate_x"
          type="number"
          placeholder="Coordinate x"
          error={errors?.coordinate_x?.message}
        />
      </div>
      <div>
        <h4>Coordinate y</h4>
        <TextInput
          type="number"
          control={control}
          name="coordinate_y"
          placeholder="Coordinate y"
          error={errors?.coordinate_y?.message}
        />
      </div>
    </>
  );
};

export default CoordinateInput;
