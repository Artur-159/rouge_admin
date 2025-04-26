import { createSlice } from "@reduxjs/toolkit";
import { StoryAPI } from "../../services/story";

const Story = createSlice({
  name: "Story slice",
  initialState: {
    data: [],
    oneStory: [],
    deleteStory: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isCleanData: (state, action) => {
      state.oneStory = action.payload;
    },
    isDeleteStory: (state, action) => {
      state.deleteStory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(StoryAPI.getStories.fulfilled, (state, action) => {
        state.data = action.payload.data.data.stories;
      })
      .addCase(StoryAPI.postStory.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(StoryAPI.deleteStory.fulfilled, (state) => {
        state.data = state.data?.filter(
          (item) => item.id !== state.deleteStory
        );
      })
      .addCase(StoryAPI.getOneStory.fulfilled, (state, action) => {
        state.oneStory = action.payload.data.data;
      })
      .addCase(StoryAPI.putUpdateStory.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export const { isStatusText, isDeleteStory, isCleanData } = Story.actions;
export default Story;
