import { CategoryState, CategoryType } from "@/types/vendor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
};

export const createCategory = createAsyncThunk(
  "/vendor/api/category",
  async (formData: CategoryType, { rejectWithValue }) => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.post(
        `${API_BASE_URL}/vendor/api/category`,
        {
          title: formData.title,
          description: formData.description,
          slug: formData.slug,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const categorySlice = createSlice({
  name: "vendor category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
