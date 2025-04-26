import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BrandAPI } from "../../../../services/brand";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";

import {
  isEditBrand,
  isStatusText,
  isBrandDeleteId,
} from "../../../../store/brand/slice";
import { isImageSlice } from "../../../../store/image/slice";
import { isModalOpen } from "../../../../store/modal/slice";
import Button from "../../../../components/button/button";
import Modal from "../../../../components/modal/modal";
import Params from "../../../../helpers/params";

import styles from "./list.module.scss";

const ListPartner = ({ className, list }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    dispatch(BrandAPI.deleteBrand(id));
    dispatch(isBrandDeleteId(id));
    dispatch(isStatusText(false));
    dispatch(isModalOpen(false));
  };

  const editHandler = (id) => {
    navigate(`${id}`);
    dispatch(isImageSlice(false));
    dispatch(BrandAPI.getOneBrand(id));
  };

  useEffect(() => {
    dispatch(isStatusText(false));
    dispatch(BrandAPI.getBrandsList(Params()));
    dispatch(isEditBrand([]));
  }, [dispatch]);

  return (
    <div className={clsx(className)}>
      <div>
        {!list?.length ? (
          <h4>empty...🥲</h4>
        ) : (
          list?.map((item) => (
            <div key={item.id} className={styles.partner_item}>
              <div>{item.name}</div>
              <div className={styles.partner_btn}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => editHandler(item.id)}
                >
                  Edit
                </Button>
                <Modal
                  variant="contained"
                  title="Delete"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  <p>
                    Are you sure you want to proceed with this action? This
                    action cannot be undone.
                  </p>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteHandler(item.id)}
                  >
                    Delete
                  </Button>
                </Modal>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default memo(ListPartner, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.list) === JSON.stringify(nextProps.list);
});
