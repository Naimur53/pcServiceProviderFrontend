import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: (query) => {
        return {
          url: `/feedback?${query}`,
        };
      },
      providesTags: [tagTypes.feedback],
    }),
    getFeedbackById: builder.query({
      query: (id) => `/feedbacks/${id}`,
      providesTags: [tagTypes.feedback],
    }),
    addFeedback: builder.mutation({
      query: (info) => {
        return {
          url: "/feedback",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.feedback],
    }),
    editFeedback: builder.mutation({
      query: (info) => {
        return {
          url: `/feedback/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.feedback],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => {
        return {
          url: `/feedback/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});
export const {
  useGetFeedbacksQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
  useEditFeedbackMutation,
  useGetFeedbackByIdQuery,
} = feedbackApi;
