 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const blogSlice = createSlice({
  name: "blog",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setBlog: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setBlog } = blogSlice.actions;

export default blogSlice.reducer;
