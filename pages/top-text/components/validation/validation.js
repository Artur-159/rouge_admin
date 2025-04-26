import * as yup from "yup";

const validation = yup.object().shape({
  name_en: yup.string().required("Name (EN) is required"),
});

export default validation;
