
import { apiSlice } from "../apiSlice/apiSlice";
export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (query) => {
        return {
          url: `/reviews?${query}`,
        };
      },
    }),
    getReviewById: builder.query({
      query: (id) => `/reviews/${id}`,
    }),
    addReview: builder.mutation({
      query: (info) => {
        return {
          url: "/reviews",
          method: "POST",
          body: info,
        };
      },
    }),
    editReview: builder.mutation({
      query: (info) => {
        return {
          url: `/reviews/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/reviews/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useEditReviewMutation,
  useGetReviewByIdQuery,
} = reviewApi;
