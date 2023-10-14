 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const pcServiceSlice = createSlice({
  name: "pcService",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setPcService: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setPcService } = pcServiceSlice.actions;

export default pcServiceSlice.reducer;
