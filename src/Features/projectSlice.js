import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjectsAsync",
  async ({projectStatus}) => { 
    const queryParams = new URLSearchParams();

    if (projectStatus) queryParams.append("status", projectStatus);

    const response = await axios.get(
      `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/projects?${queryParams.toString()}`
    );
    const data = response.data;
   
    return data;
  }
);

export const addProjectAsync = createAsyncThunk(
  "projects/addProjectAsync",
  async ({ newProject }) => {
    const response = await axios.post(
      `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/projects`,
      newProject
    );
    const data = response.data;
    return data;
  }
);

export const updateProjectAsync = createAsyncThunk("project/updateProjectAsync", async({id, updateProject})=>{
  console.log(id, updateProject)
  const response = await axios.put(
    `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/projects/${id}`,
    updateProject
  );
  const data = response.data;
  console.log(data, "updated Project data");
  return data;
})

export const deleteProjectAsync = createAsyncThunk("project/deleteProjectAsync", async({id})=>{
  const response = await axios.delete(
    `https://workasana-backend-git-main-rekha-kumari-bheels-projects.vercel.app/api/projects/${id}`  
  );
  const data = response.data;
  console.log(data, "deleted Project data");
  return data;
})


export const projectSlice = createSlice({
  name: "Projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch projects
    builder.addCase(fetchProjectsAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchProjectsAsync.fulfilled, (state, action) => {
      state.status = "All projects";
      state.projects = action.payload;
    
    });
    builder.addCase(fetchProjectsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //add project
    builder.addCase(addProjectAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addProjectAsync.fulfilled, (state, action) => {
      state.status = "Project Added";
      state.projects = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(addProjectAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

 //update project
 builder.addCase(updateProjectAsync.pending, (state) => {
  state.status = "Loading";
});
builder.addCase(updateProjectAsync.fulfilled, (state, action) => {
  state.status = "Project updated";
  state.projects = action.payload;
  console.log(action.payload, "payload");
});
builder.addCase(updateProjectAsync.rejected, (state, action) => {
  state.status = "error";
  state.error = action.error.message;
});

//delete Project
builder.addCase(deleteProjectAsync.pending, (state) => {
  state.status = "Loading";
});
builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
  state.status = "Project deleted";
  state.projects = action.payload;
});
builder.addCase(deleteProjectAsync.rejected, (state, action) => {
  state.status = "error";
  state.error = action.error.message;
});

  },
});

export default projectSlice.reducer;
