import { authKey } from "@/constants/storageKey";
import { IUser } from "@/types/common";
import { getFromLocalStorage } from "@/utils/local-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type IState = {
  isLoading: boolean;
  isError: boolean;
  user: IUser | null;
  accessToken: string | null;
  error: string | null;
};

interface ICredential {
  email: string;
  password: string;
}
const initialState: IState = {
  isLoading: true,
  isError: false,
  error: null,
  user: null,
  accessToken: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (info: Omit<IUser, "id" | "role" | "profileImg">) => {
    const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    if (data.success) {
      console.log({ data });
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (info: ICredential) => {
    const res = await fetch("http://localhost:5000/api/v1/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
);
export const loginUserWithToken = createAsyncThunk(
  "user/loginUserWithToken",
  async () => {
    const res = await fetch("http://localhost:5000/api/v1/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getFromLocalStorage(authKey) || "",
      },
    });
    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload.isError;
      state.error = action.payload.error;
    },
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      // Storing user information in localStorage
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    userLoggedOut: (state) => {
      state.accessToken = null;
      state.user = null;
      state.error = null;
      state.isError = false;
      state.isLoading = false;
      // Clear user information from localStorage
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;

        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;

        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUserWithToken.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUserWithToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = getFromLocalStorage(authKey);
        state.isLoading = false;
      })
      .addCase(loginUserWithToken.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { userLoggedIn, userLoggedOut, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
