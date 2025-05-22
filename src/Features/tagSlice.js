import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { workasana_URL } from "./userSlice";

export const fetchTagsAsync = createAsyncThunk(
  "tags/fetchTagsAsync",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${workasana_URL}/tags`,{ headers: {
        Authorization: `${token}`, 
      },}
    );
    const data = response.data;
    return data;
  }
);

export const addTagsAsync = createAsyncThunk(
  "tags/addTagsAsync",
  async (newTag) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${workasana_URL}/tags`,
      newTag,{ headers: {
        Authorization: `${token}`, 
      },}
    );
    const data = response.data;
    console.log(data, "data submit");
    return data;
  }
);

export const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    tagStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch tags
    builder.addCase(fetchTagsAsync.pending, (state) => {
      state.tagStatus = "Loading";
    });
    builder.addCase(fetchTagsAsync.fulfilled, (state, action) => {
      state.tagStatus = "All tags";
      state.tags = action.payload;
      // console.log(action.payload, "payload")
    });
    builder.addCase(fetchTagsAsync.rejected, (state, action) => {
      state.tagStatus = "error";
      state.error = action.error.message;
    });

    //add tag
    builder.addCase(addTagsAsync.pending, (state) => {
      state.tagStatus = "Loading";
    });
    builder.addCase(addTagsAsync.fulfilled, (state, action) => {
      state.tagStatus = "Added tags";
      state.tags = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(addTagsAsync.rejected, (state, action) => {
      state.tagStatus = "error";
      state.error = action.error.message;
    });
  },
});
export default tagSlice.reducer;
