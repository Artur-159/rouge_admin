import React from "react";
import TextInput from "../../text-input/text-input";
import TextEditor from "../../text-editor/text-editor";

import styles from "../../../pages/faq/faq.module.scss";
const RenderInputSection = ({
  control,
  errors,
  name,
  lang,
  editorErrorMessage,
  placeholder,
  className,
}) => (
  <div className={className}>
    <div>
      <h4>Question {lang} </h4>
      <TextInput
        control={control}
        error={errors}
        name={name}
        placeholder={placeholder}
        className={styles.faq_question}
      />
    </div>

    <div>
      <h4>Answer {lang} </h4>
      <TextEditor
        control={control}
        error={editorErrorMessage}
        name={`answer_${name.split("_")[1]}`}
        placeholder={`Answer ${name.split("_")[1]}`}
        className={styles.faq_text_editor}
      />
    </div>
  </div>
);

export default RenderInputSection;
