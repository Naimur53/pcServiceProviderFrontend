 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const bookingSlice = createSlice({
  name: "booking",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
