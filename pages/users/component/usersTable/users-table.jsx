import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthorizationAPI } from "../../../../services/authorization";
import { isModalOpen } from "../../../../store/modal/slice";
import Toast from "../../../../helpers/status-text";
import Params from "../../../../helpers/params";
import Button from "../../../../components/button/button";
import Modal from "../../../../components/modal/modal";
import Pagination from "../../../../components/pagination/pagination";
import RoleSelect from "../role-select/role-select";
import {
  isDeleteUserId,
  isOffset,
  isStatusText,
} from "../../../../store/authorization/slice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import clsx from "clsx";

import styles from "./users-table.module.scss";

const UserTable = ({
  list,
  subTitle,
  className,
  status,
  totalUsers,
  userRole,
  offset,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let options = Params(6);
    options.offset = offset * 6;
    options.filter_role = userRole;
    dispatch(AuthorizationAPI.getUsersList(options));
    dispatch(isOffset(options.offset));
  }, [dispatch, status, userRole, offset]);

  const deleteHandler = (id) => {
    dispatch(AuthorizationAPI.deleteAdmin(id));
    dispatch(isDeleteUserId(id));
    dispatch(isModalOpen(false));
  };

  const blockedHandler = (user) => {
    let blocked = user.blocked === 1 ? 0 : 1;
    let user_id = user.id;
    let data = { blocked, user_id };
    dispatch(AuthorizationAPI.putBlocked(data));
  };

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          dispatch(isStatusText(false));
        },
      });
    }
  }, [dispatch, status]);

  return (
    <div className={clsx(className)}>
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {subTitle?.map((item, i) => (
                  <TableCell
                    key={i}
                    align={item === "Delete user" ? "right" : "left"}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className={styles.th_index} align="left">
                    {row.id}
                  </TableCell>

                  <TableCell>
                    {row?.name} {row?.surname}
                  </TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="left">{row?.phone}</TableCell>
                  <TableCell align="left">
                    <span
                      className={
                        row?.blocked === 0 ? styles.active : styles.blocked
                      }
                    >
                      {row?.blocked === 0 ? "Active" : "Blocked"}
                    </span>
                    <Button
                      variant="outlined"
                      color={row?.blocked === 0 ? "error" : "success"}
                      onClick={() => blockedHandler(row)}
                    >
                      {row?.blocked === 0 ? "Block" : "Activate"}
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <RoleSelect
                      defaultValue={row.role === 0 ? "User" : "Admin"}
                      id={row.id}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Modal
                      variant="contained"
                      title="Delete"
                      color="error"
                      id={row.id}
                    >
                      <p>
                        Are you sure you want to proceed with this action? This
                        action cannot be undone.
                      </p>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteHandler(row.id)}
                      >
                        Delete
                      </Button>
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination offset={offset} total={totalUsers} />
      </Paper>
    </div>
  );
};
export default UserTable;
