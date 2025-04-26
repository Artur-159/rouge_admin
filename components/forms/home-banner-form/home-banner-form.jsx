import TextInput from "../../text-input/text-input";
import MainTextarea from "../../main-textarea/main-textarea";
import styles from "../../../pages/home/home.module.scss";

const HomeBannerForm = ({
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
    />
    <MainTextarea
      control={control}
      error={editorErrorMessage}
      rows={20}
      name={`description_${name.split("_")[1]}`}
      placeholder={`Description ${name.split("_")[1]}`}
      className={styles.homeBanner_forms_desc}
    />
  </div>
);

export default HomeBannerForm;
