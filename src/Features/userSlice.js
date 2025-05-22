import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const workasana_URL="https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api"

export const fetchUserAsync = createAsyncThunk(
  "users/fetchUserAsync",
  async () => {
    const response = await axios.get(
      `${workasana_URL}/users`, {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  }
);

export const registerUserAsync = createAsyncThunk(
  "users/registerUserAsync",
  async (credentials) => {
    const response = await axios.post(
      `${workasana_URL}/users/register`,
     credentials
    );
    const data = response.data;
     console.log("signup response:", response.data);
    localStorage.setItem("token", response.data.token);
    console.log(data, "data submit");
    return data;
  }
);

export const userLoginAsync = createAsyncThunk("users/userLoginAsync",async(credentials)=>{
  try {
    const response = await axios.post(
      `${workasana_URL}/users/login`,
      credentials
    );
    console.log("Login response:", response.data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    ;
  }
 
})

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    statusUser: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch User
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.statusUser = "All User";
      state.users = action.payload;
      // console.log(action.payload, "payload");
    });
    builder.addCase(fetchUserAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });

    //register
    builder.addCase(registerUserAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.statusUser = "User registerd.";
      state.users = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });

     //login
     builder.addCase(userLoginAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      state.statusUser = "User Login token.";
      state.users = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(userLoginAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
