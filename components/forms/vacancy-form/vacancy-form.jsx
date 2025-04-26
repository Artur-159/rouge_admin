import TextInput from "../../text-input/text-input";
import TextEditor from "../../text-editor/text-editor";

import styles from "../../../pages/vacancy/vacancy.module.scss";

const VacancyForm = ({
  control,
  errors,
  name,
  editorErrorMessage,
  placeholder,
  className,
}) => (
  <div className={className}>
    <TextInput
      control={control}
      error={errors}
      name={name}
      placeholder={placeholder}
      className={styles.vacancy_question}
    />
    <TextEditor
      control={control}
      error={editorErrorMessage}
      name={`description_${name.split("_")[1]}`}
      placeholder={`Description ${name.split("_")[1]}`}
      className={styles.vacancy_text_editor}
    />
  </div>
);

export default VacancyForm;
