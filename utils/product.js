import EditIcon from "@mui/icons-material/Edit";
import MainButton from "../components/button/button";

const baseURL = process.env.REACT_APP_BASE_URL_IMG;

export const getColumns = (editHandler) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 20,
      headerClassName: "no-ellipsis",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 250,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "image",
      headerName: "Image",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) => (
        <img
          src={`${baseURL}${params.value}`}
          alt="Product"
          style={{ width: "35px", height: "35px", objectFit: "cover" }}
        />
      ),
    },

    {
      field: "brand",
      headerName: "Brand",
      width: 150,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "barcode",
      headerName: "Barcode",
      width: 130,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "group_id",
      headerName: "Group Id",
      width: 130,
      headerClassName: "no-ellipsis",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "volume_unit",
      headerName: "Volume",
      width: 90,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "color_code",
      headerName: "Color Code",
      width: 90,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
    },
    {
      field: "color",
      headerName: "Color",
      width: 90,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "active",
      headerName: "Status",
      width: 60,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => (params.row.active ? "✔" : "✘"),
    },
    {
      field: "count",
      headerName: "Count",
      width: 60,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
      type: "number",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      headerClassName: "no-ellipsis",
      headerAlign: "center",
      type: "number",
      align: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      align: "right",
      width: 100,
      renderCell: (params) => (
        <MainButton
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => editHandler(params.row.barcode)}
        >
          Edit
        </MainButton>
      ),
    },
  ];
};
