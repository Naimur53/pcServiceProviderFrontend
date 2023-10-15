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
    }),
    addBooking: builder.mutation({
      query: (info) => {
        return {
          url: "/bookings",
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
    }),
  }),
});
export const {
  useGetBookingsQuery,
  useAddBookingMutation,
  useDeleteBookingMutation,
  useEditBookingMutation,
  useGetBookingByIdQuery,
} = bookingApi;
