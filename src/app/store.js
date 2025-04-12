import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "../Features/projectSlice";
import { tagSlice } from "../Features/tagSlice";
import { taskSlice } from "../Features/taskSlice";
import { teamSlice } from "../Features/teamSlice";
import { userSlice } from "../Features/userSlice";

export default configureStore({
    reducer:{
        projects:projectSlice.reducer,
        tags:tagSlice.reducer,
        tasks:taskSlice.reducer,
        teams:teamSlice.reducer,
        users: userSlice.reducer

    }
})