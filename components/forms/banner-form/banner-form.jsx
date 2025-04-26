import TextInput from "../../text-input/text-input";
import MainTextarea from "../../main-textarea/main-textarea";

import styles from "../../banner/banner.module.scss";

const BannerForm = ({
  control,
  name,
  errors,
  editErrorDesc,
  placeholder,
  className,
  language,
}) => (
  <div className={className}>
    <div>
      <h3>Banner name {language}</h3>
      <TextInput
        control={control}
        error={errors}
        name={name}
        placeholder={placeholder}
        className={styles.blog_name}
      />
    </div>

    <div>
      <h3> Description {language}</h3>
      <MainTextarea
        control={control}
        error={editErrorDesc}
        rows={20}
        name={`description_${name.split("_")[1]}`}
        placeholder={`Description ${name.split("_")[1]}`}
        className={styles.blog_desc}
      />
    </div>
  </div>
);

export default BannerForm;
