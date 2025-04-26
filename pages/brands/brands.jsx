import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { BrandAPI } from "../../services/brand";
import Params from "../../helpers/params";
import List from "./component/list/list";
import MainButton from "../../components/button/button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { isImageSlice, isListVideosImages } from "../../store/image/slice";
import { isStatusText } from "../../store/brand/slice";

import styles from "./brands.module.scss";

const Brands = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listBrands, status } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(BrandAPI.getBrandsList(Params()));
    dispatch(isListVideosImages(false));
    dispatch(isImageSlice(false));
    dispatch(isStatusText(false));
  }, [dispatch, status]);

  const handlerLinkClick = () => {
    navigate("create");
  };
  const handlerCreateBanner = () => {
    navigate("banner");
  };

  return (
    <div>
      <h1>Brands</h1>
      <div className={styles.brands_bts}>
        <MainButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handlerLinkClick}
          className={styles.btn_create}
        >
          Create
        </MainButton>
        <MainButton
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handlerCreateBanner}
          className={styles.btn_create}
        >
          banner
        </MainButton>
      </div>
      <List list={listBrands} />
    </div>
  );
};

export default Brands;
