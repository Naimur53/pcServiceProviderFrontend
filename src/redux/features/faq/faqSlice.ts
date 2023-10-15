 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const faqSlice = createSlice({
  name: "faq",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setFaq: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setFaq } = faqSlice.actions;

export default faqSlice.reducer;
