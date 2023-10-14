import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {}

// Define the initial state using that type
const initialState: IInitialState = {};

export const pcServiceProviderFrontendSlice = createSlice({
  name: "pcServiceProviderFrontend",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setPcServiceProviderFrontend: (state, action: PayloadAction<any>) => {},
  },
});

export const { setPcServiceProviderFrontend } =
  pcServiceProviderFrontendSlice.actions;

export default pcServiceProviderFrontendSlice.reducer;
