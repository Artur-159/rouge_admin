import { useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import ClearIcon from "@mui/icons-material/Clear";
import { HomeAPI } from "../../../../../services/home";
import { isDeleteMedia } from "../../../../../store/home/slice";

import styles from "../../../../../components/uploads/videos-images/videos-images.module.scss";

const VideosImages = ({
  name,
  error,
  images,
  control,
  className,
  multiple = true,
  disabled = false,
  title = "Choose videos, Images",
}) => {
  const dispatch = useDispatch();
  const lang = name.split("_")[1];

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
    dispatch(HomeAPI.postMedia({ media: selected, lang: lang }));
  };

  const deleteImage = () => {
    onChange(null);
    dispatch(isDeleteMedia({ lang }));
  };

  return (
    <div className={clsx(className, styles.upLoadImage)}>
      <div className={styles.dropzone}>
        <div className={styles.img_input}>
          <label>
            <span>{title}</span>
            <input
              type="file"
              name={fieldName}
              disabled={disabled}
              multiple={multiple}
              accept="image/*,video/*"
              onChange={changeSectionItem}
            />
          </label>
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>
        {
          <ul className={styles.img_box}>
            {images &&
              images?.map((item, index) => (
                <li key={index}>
                  {item?.[`path_${lang}`] &&
                  item?.[`file_type_${lang}`] === "image" ? (
                    <img
                      alt={`Media for ${lang}`}
                      src={`${baseURL}${item?.[`path_${lang}`]}`}
                    />
                  ) : item?.[`file_type_${lang}`] === "video" ? (
                    <video width="150" height="100" controls>
                      <source src={`${baseURL}${item?.[`path_${lang}`]}`} />
                    </video>
                  ) : (
                    //? which case this code will be executed ?
                    <img src={`${baseURL}${item}`} alt={`Media for ${lang}`} />
                  )}
                  <ClearIcon
                    className={styles.clear_icon}
                    onClick={() => deleteImage()}
                  />
                </li>
              ))}
          </ul>
        }
      </div>
    </div>
  );
};

export default VideosImages;
