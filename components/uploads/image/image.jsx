import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import { VideoImageAPI } from "../../../services/videos-images";
import { isDeleteImage } from "../../../store/image/slice";

import styles from "./image.module.scss";

const Image = ({
  name,
  control,
  className,
  status,
  editImage,
  image,
  error,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const {
    field: { name: fieldName, onChange },
  } = useController({
    name,
    control,
  });
  const baseURL = process.env.REACT_APP_BASE_URL_IMG;

  const changeSectionItem = (e) => {
    const { files } = e.target;
    const selected = Array.from(files);
    onChange(selected);
    dispatch(VideoImageAPI.postImage({ media: files }));
  };
  const handleImageDelete = (image) => {
    dispatch(isDeleteImage(image));
  };

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [status, dispatch, image]);

  return (
    <div className={className}>
      <div>
        <div>
          <input
            type="file"
            name={fieldName}
            accept="image/*"
            control={control}
            ref={fileInputRef}
            onChange={changeSectionItem}
          />
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>
        {(image || editImage) && (
          <div className={styles.imagePreview}>
            <img src={`${baseURL}${image || editImage}`} alt="upload " />

            <ClearIcon
              className={styles.clear_icon}
              onClick={() => handleImageDelete(image)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;
