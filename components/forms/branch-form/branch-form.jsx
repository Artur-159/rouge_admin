import TextInput from "../../text-input/text-input";

import styles from "../../../pages/branch/branch.module.scss";

const BranchForm = ({
  control,
  errors,
  name,
  placeholder,
  className,
  language,
  errorsName,
}) => (
  <div className={className}>
    <div className={styles.box}>
      <h3>Address {language}</h3>
      <TextInput
        control={control}
        error={errors}
        name={name}
        placeholder={placeholder}
        className={styles.blog_name}
      />
    </div>

    <div className={styles.box}>
      <h3> Branch name {language}</h3>
      <TextInput
        control={control}
        name={`address_${name.split("_")[1]}`}
        placeholder={`name ${name.split("_")[1]}`}
        error={errorsName}
        className={styles.blog_desc}
      />
    </div>
  </div>
);

export default BranchForm;
