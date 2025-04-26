import { createSlice } from "@reduxjs/toolkit";
import { VacancyAPI } from "../../services/vacancy";

const Vacancy = createSlice({
  name: "Vacancy slice",
  initialState: {
    list: [],
    oneVacancy: [],
    deleteVacancy: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isDeleteVacancy: (state, action) => {
      state.deleteVacancy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(VacancyAPI.getVacancies.fulfilled, (state, action) => {
        state.list = action.payload.data.data;
      })
      .addCase(VacancyAPI.postVacancy.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(VacancyAPI.deleteVacancy.fulfilled, (state) => {
        state.list = state.list.filter(
          (item) => item.id !== state.deleteVacancy
        );
      })
      .addCase(VacancyAPI.getOneVacancy.fulfilled, (state, action) => {
        state.oneVacancy = action.payload.data.data;
      })
      .addCase(VacancyAPI.putUpdateVacancy.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export const { isStatusText, isDeleteVacancy } = Vacancy.actions;
export default Vacancy;
