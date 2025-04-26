import TextInput from "../../text-input/text-input";
import MainTextarea from "../../main-textarea/main-textarea";

import styles from "../../../pages/service/service.module.scss";

const ServiceForm = ({
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
      className={styles.service_question}
    />
    <MainTextarea
      control={control}
      error={editorErrorMessage}
      rows={20}
      name={`description_${name.split("_")[1]}`}
      placeholder={`Description ${name.split("_")[1]}`}
      className={styles.service_text_editor}
    />
  </div>
);

export default ServiceForm;
