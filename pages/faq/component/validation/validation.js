import * as yup from "yup";

export const validation = yup.object().shape({
  sort_number: yup.string().required("Sort number is required"),
  question_en: yup.string().required("Question (EN) is required"),
  answer_en: yup.string().required("Answer (EN)  is required"),
});
