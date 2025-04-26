import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AuthorizationAPI } from "../../services/authorization";
import { isOffset, isUserRole } from "../../store/authorization/slice";
import { USERS_TABLE_SUBTITLE, ROLE_BUTTONS } from "../../constant/table";
import Params from "../../helpers/params";
import Button from "../../components/button/button";
import UserTable from "./component/usersTable/users-table";
import TextInput from "../../components/text-input/text-input";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./users.module.scss";

const Users = () => {
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();

  const { usersList, status, totalUsers, userRole } = useSelector(
    (state) => state.authorization
  );
  const { offset } = useSelector((state) => state.pagination);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSearch = handleSubmit((data) => {
    data.params = Params(10, offset);
    if (userRole) {
      data.filter_role = userRole;
    }
    data = { ...data.params, ...data };
    delete data.params;
    dispatch(AuthorizationAPI.getUsersList(data));
  });

  const handleRole = (selectedRole) => {
    dispatch(isOffset(0));
    setRole(selectedRole);
    dispatch(isUserRole(selectedRole));
  };

  useEffect(() => {
    let filter_role = userRole;
    let data = Params(6, offset * 6);
    data = { ...data, filter_role };
    dispatch(AuthorizationAPI.getUsersList(data));
  }, [dispatch, userRole, offset]);

  return (
    <div className={styles.addAdmin}>
      <h1 className={styles.course_title}>Users</h1>
      <div className={styles.search_info}>
        <div className={styles.btn_list}>
          {ROLE_BUTTONS?.map((item) => (
            <Button
              key={item.value}
              onClick={() => handleRole(item.value)}
              variant={role === item.value ? "contained" : "outlined"}
            >
              {item.label}
            </Button>
          ))}
        </div>
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
      </div>
      {!usersList?.length ? (
        <h4>empty...🥲</h4>
      ) : (
        <UserTable
          status={status}
          offset={offset}
          list={usersList}
          userRole={userRole}
          totalUsers={totalUsers}
          subTitle={USERS_TABLE_SUBTITLE}
        />
      )}
    </div>
  );
};

export default Users;
