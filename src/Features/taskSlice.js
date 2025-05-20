import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasksAsync",
  async ({ taskStatus, prioritySort, dateSort } = {}) => {
    const queryParams = new URLSearchParams();

    if (taskStatus) queryParams.append("status", taskStatus);
    if (prioritySort) queryParams.append("prioritySort", prioritySort);
    if (dateSort) queryParams.append("dateSort", dateSort);

    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/tasks?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  }
);

export const addTasksAsync = createAsyncThunk(
  "tasks/addTasksAsync",
  async ({ newTask }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/tasks`,
      newTask,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTaskAsync",
  async ({ id, updateTask }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/tasks/${id}`,
      updateTask,{ headers: {
        Authorization: `${token}`, 
      },}
    );
    const data = response.data;
    return data;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTaskAsync",
  async ({ id }) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/tasks/${id}`,{ headers: {
        Authorization: `${token}`, 
      },}
    );
    const data = response.data;
    return data;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch tasks
    builder.addCase(fetchTasksAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchTasksAsync.fulfilled, (state, action) => {
      state.status = "All Tasks";
      state.tasks = action.payload;
      // console.log(action.payload, "payload");
    });
    builder.addCase(fetchTasksAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //add task
    builder.addCase(addTasksAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addTasksAsync.fulfilled, (state, action) => {
      state.status = "Added tasks";
      state.tasks = action.payload;
    });
    builder.addCase(addTasksAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //update task
    builder.addCase(updateTaskAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      state.status = "updated tasks";
      state.tasks = action.payload;
    });
    builder.addCase(updateTaskAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //delete task
    builder.addCase(deleteTaskAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      state.status = "deleted tasks";
      state.tasks = action.payload;
    });
    builder.addCase(deleteTaskAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default taskSlice.reducer;
