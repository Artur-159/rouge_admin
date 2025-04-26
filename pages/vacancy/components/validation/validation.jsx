import * as yup from "yup";

export const validation = yup.object().shape({
  name_am: yup.string().required("Title am is required"),
  name_ru: yup.string().required("Title ru is required"),
  name_en: yup.string().required("Title en is required"),
  description_am: yup.string().required("Description am  is required"),
  description_ru: yup.string().required("Description ru  is required"),
  description_en: yup.string().required("Description en  is required"),
});
