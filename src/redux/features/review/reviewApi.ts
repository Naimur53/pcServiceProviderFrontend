import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (query) => {
        return {
          url: `/review?${query}`,
        };
      },
    }),
    getReviewById: builder.query({
      query: (id) => `/review/${id}`,
    }),
    addReview: builder.mutation({
      query: (info) => {
        return {
          url: "/review",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.pcService],
    }),
    editReview: builder.mutation({
      query: (info) => {
        return {
          url: `/review/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/review/${id}`,
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
