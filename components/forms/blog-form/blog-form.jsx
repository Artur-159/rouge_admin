import TextInput from "../../text-input/text-input";
import MainTextarea from "../../main-textarea/main-textarea";

import styles from "../../../pages/blog/blog.module.scss";

const BlogForm = ({
  control,
  name,
  errors,
  errorDescMessage,
  errorShortDescMessage,
  placeholder,
  className,
  language,
}) => (
  <div className={className}>
    <div>
      <h3>Blog name {language}</h3>
      <TextInput
        control={control}
        error={errors}
        name={name}
        placeholder={placeholder}
        className={styles.blog_name}
      />
    </div>

    <div>
      <h3>Short description {language}</h3>
      <MainTextarea
        control={control}
        error={errorShortDescMessage}
        rows={13}
        name={`short_description_${name.split("_")[1]}`}
        placeholder={`Short Description ${name.split("_")[1]}`}
        className={styles.blog_short_desc}
      />
    </div>
    <div>
      <h3> Description {language}</h3>
      <MainTextarea
        control={control}
        error={errorDescMessage}
        rows={20}
        name={`description_${name.split("_")[1]}`}
        placeholder={`Description ${name.split("_")[1]}`}
        className={styles.blog_desc}
      />
    </div>
  </div>
);

export default BlogForm;
