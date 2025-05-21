import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMembersAsync = createAsyncThunk(
  "members/fetchMembersAsync",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/members`,{ headers: {
        Authorization: `${token}`, 
      },}
    );
    const data = response.data;
    return data;
  }
);

export const addMembersAsync = createAsyncThunk(
  "members/addMembersAsync",
  async ({name}) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/members`,
      {name},{ headers: {
        Authorization: `${token}`, 
      },}
    );
    const data = response.data;
    console.log(data, "data submit");
    return data;
  }
);

export const deleteMembersAsync = createAsyncThunk("members/deleteMembersAsync", async({id})=>{
    const token = localStorage.getItem("token");
    const response = await axios.delete(`https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/members/${id}`,{
        headers: {
        Authorization: `${token}`, 
      },
    })
    const data= response.data
    console.log(data, "deleted")
    return data
})

export const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    memberStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch members
    builder.addCase(fetchMembersAsync.pending, (state) => {
      state.memberStatus = "Loading";
    });
    builder.addCase(fetchMembersAsync.fulfilled, (state, action) => {
      state.memberStatus = "All members";
      state.members = action.payload;
      // console.log(action.payload, "payload")
    });
    builder.addCase(fetchMembersAsync.rejected, (state, action) => {
      state.memberStatus = "error";
      state.error = action.error.message;
    });

    //add tag
    builder.addCase(addMembersAsync.pending, (state) => {
      state.memberStatus = "Loading";
    });
    builder.addCase(addMembersAsync.fulfilled, (state, action) => {
      state.memberStatus = "Added members";
      state.members = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(addMembersAsync.rejected, (state, action) => {
      state.memberStatus = "error";
      state.error = action.error.message;
    });

    //delete member
    builder.addCase(deleteMembersAsync.pending, (state) => {
      state.memberStatus = "Loading";
    });
    builder.addCase(deleteMembersAsync.fulfilled, (state, action) => {
      state.memberStatus = "Added members";
      state.members = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(deleteMembersAsync.rejected, (state, action) => {
      state.memberStatus = "error";
      state.error = action.error.message;
    });
  },
});
export default memberSlice.reducer;
