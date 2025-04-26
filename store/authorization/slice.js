import { createSlice } from "@reduxjs/toolkit";

import { AuthorizationAPI } from "../../services/authorization";

const AuthorizationSlice = createSlice({
  name: "authorization",
  initialState: {
    deleteUsersId: null,
    adminRole: null,
    userRole: null,
    status: null,
    usersList: [],
    offset: 0,
    totalUsers: "",
    isAuth: "",
  },
  reducers: {
    isOffset: (state, action) => {
      state.offset = action.payload;
    },
    isAuthentication: (state, action) => {
      state.isAuth = action.payload;
    },
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isDeleteUserId: (state, action) => {
      state.deleteUsersId = action.payload;
    },
    isUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AuthorizationAPI.getUsersList.fulfilled, (state, action) => {
        state.usersList = action.payload.data.data.users;
        state.totalUsers = action.payload.data.data.totalUsers;
      })
      .addCase(
        AuthorizationAPI.postAuthorization.fulfilled,
        (state, action) => {
          state.status = action.payload.statusText;
          state.isAuth = action.payload.data.data.token;
          state.adminRole = action.payload.data.data.user.role;
          localStorage.setItem("token", action.payload.data.data.token);
          localStorage.setItem("adminRole", action.payload.data.data.user.role);
        }
      )
      .addCase(AuthorizationAPI.postRegSubAdmin.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
        localStorage.setItem("token", action.payload.data.data.token);
        localStorage.setItem("adminRole", action.payload.data.data.user);
        state.usersList = [...state.usersList, action.payload.data.data];
      })
      .addCase(AuthorizationAPI.postLogout.fulfilled, (state, action) => {
        state.status = action.payload.message;
        if (state.status) {
          localStorage.removeItem("token");
          localStorage.removeItem("adminRole");
        }
      })
      .addCase(AuthorizationAPI.putBlocked.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(AuthorizationAPI.putChangeRole.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(AuthorizationAPI.deleteAdmin.fulfilled, (state) => {
        state.status = true;
        state.usersList = state.usersList.filter(
          (item) => item.id !== state.deleteUsersId
        );
      });
  },
});

export const {
  isAuthentication,
  isStatusText,
  isDeleteUserId,
  isUserRole,
  isOffset,
} = AuthorizationSlice.actions;
export default AuthorizationSlice;
