 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const feedbackSlice = createSlice({
  name: "feedback",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setFeedback: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;
