import { useRef } from "react";
import { useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { VideoImageAPI } from "../../../services/videos-images";
import { isDeleteVideosImages } from "../../../store/image/slice";

import styles from "./videos-images.module.scss";

const VideosImages = ({
  name,
  title = "Choose videos, Images",
  control,
  className,
  images,
  error,
  disabled = false,
  multiple = true,
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
    dispatch(VideoImageAPI.postVideosImages({ media: selected }));
  };

  const handleDeleteImage = (imageIndex) => {
    dispatch(isDeleteVideosImages(imageIndex));
  };

  return (
    <div className={className}>
      <div>
        <div className={styles.img_input}>
          <label>
            <span>{title}</span>
            <input
              type="file"
              name={fieldName}
              ref={fileInputRef}
              disabled={disabled}
              multiple={multiple}
              accept="image/*,video/*"
              onChange={changeSectionItem}
            />
          </label>
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>

        <ul className={styles.img_box}>
          {images &&
            images?.map((item, index) => (
              <li key={index}>
                {item?.path && item.file_type === "image" ? (
                  <img src={`${baseURL}${item?.path}`} alt={item?.path} />
                ) : item.file_type === "video" ? (
                  <video width="150" height="100" controls>
                    <source src={`${baseURL}${item?.path}`} type={item?.type} />
                  </video>
                ) : (
                  <img src={`${baseURL}${item}`} alt={item?.path} />
                )}
                <ClearIcon
                  className={styles.clear_icon}
                  onClick={() => handleDeleteImage(index)}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default VideosImages;
