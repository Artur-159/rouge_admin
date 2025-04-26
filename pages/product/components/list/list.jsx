import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ProductAPI } from "../../../../services/product";
import { getColumns } from "../../../../utils/product";
import Params from "../../../../helpers/params";
import { isPage } from "../../../../store/pagination/slice";
import Pagination from "../../../../components/pagination/pagination";
import TextInput from "../../../../components/text-input/text-input";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";

import styles from "../../product.module.scss";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortModel, setSortModel] = useState({ field: "", sort: "" });

  const { offset } = useSelector((state) => state.pagination);
  const { list, total } = useSelector((state) => state.product);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const editHandler = (barcode) => {
    dispatch(ProductAPI.getOneProduct(barcode));
    navigate(`${barcode}`);
  };

  const onSearch = handleSubmit((data) => {
    data.params = Params(20, offset);
    data = { ...data.params, ...data };
    delete data.params;
    dispatch(ProductAPI.getProducts(data));
  });

  const columns = getColumns(editHandler);

  const handleSortModelChange = (model) => {
    if (model.length > 0) {
      const { field, sort } = model[0];
      setSortModel({ field, sort });
      dispatch(isPage(0));
    }
  };

  const params = useMemo(() => {
    let baseParams = Params(20, offset * 20);

    if (sortModel.field && sortModel.sort) {
      baseParams = {
        ...baseParams,
        ordering: {
          field: sortModel.field,
          sort: sortModel.sort,
        },
      };
    }

    return baseParams;
  }, [offset, sortModel]);

  useEffect(() => {
    dispatch(ProductAPI.getProducts(params));
  }, [dispatch, params, offset]);

  const filteredData = useMemo(() => {
    return list?.map((item) => {
      const { images, volume, ...rest } = item;
      return rest;
    });
  }, [list]);

  return (
    <>
      <div className={styles.search}>
        <TextInput
          size="small"
          name={"search"}
          control={control}
          placeholder={"Search users"}
          className={styles.search_inp}
        />
        <SearchIcon className={styles.search_icon} onClick={onSearch} />
      </div>
      <Paper
        sx={{
          width: "93%",
          margin: "20px 0 40px 0",
        }}
      >
        <DataGrid
          columns={columns}
          rows={filteredData}
          hideFooterPagination
          pageSize={filteredData.length}
          getRowClassName={() => styles.centeredRow}
          sx={{
            border: 0,
            ".MuiDataGrid-footerContainer": { display: "none" },
          }}
          onSortModelChange={handleSortModelChange}
          disableSelectionOnClick
          autoHeight
        />
      </Paper>
      {total > 20 && (
        <Pagination
          className={styles.pagination}
          total={total}
          offset={offset}
        />
      )}
    </>
  );
};

export default List;
