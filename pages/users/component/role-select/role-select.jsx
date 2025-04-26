import { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthorizationAPI } from "../../../../services/authorization";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const RoleSelect = ({ defaultValue, id }) => {
  const [age, setAge] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setAge(event.target.value);
    let user_id = id;
    let new_role = event.target.value;
    let data = { new_role, user_id };
    dispatch(AuthorizationAPI.putChangeRole(data));
  };

  return (
    <Box sx={{ width: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{defaultValue}</InputLabel>
        <Select
          value={age}
          label={defaultValue}
          onChange={handleChange}
          id="demo-simple-select"
          labelId="demo-simple-select-label"
        >
          <MenuItem value={0}>User</MenuItem>
          <MenuItem value={2}>Admin</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoleSelect;
