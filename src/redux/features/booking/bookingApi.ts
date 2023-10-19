import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes, tagTypesList } from "../apiSlice/tagTypesList";
export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (query) => {
        return {
          url: `/booking?${query}`,
        };
      },
      providesTags: [tagTypes.booking],
    }),
    getBookingById: builder.query({
      query: (id) => `/booking/${id}`,
      providesTags: [tagTypes.booking],
    }),
    getSingleUserBookingByUserId: builder.query({
      query: (id) => `/booking/singleUserAllBooking/${id}`,
      providesTags: [tagTypes.booking],
    }),
    addBooking: builder.mutation({
      query: (info) => {
        return {
          url: "/booking",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.booking],
    }),
    editBooking: builder.mutation({
      query: (info) => {
        return {
          url: `/booking/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.booking],
    }),
    deleteBooking: builder.mutation({
      query: (id) => {
        return {
          url: `/booking/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});
export const {
  useGetBookingsQuery,
  useAddBookingMutation,
  useDeleteBookingMutation,
  useEditBookingMutation,
  useGetSingleUserBookingByUserIdQuery,
  useGetBookingByIdQuery,
} = bookingApi;
