import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: (query) => {
        return {
          url: `/cart?${query}`,
        };
      },
      providesTags: [tagTypes.cart],
    }),
    getSingleUserCarts: builder.query({
      query: (id) => {
        return {
          url: `/cart/singleUserAllCart/${id}`,
        };
      },
      providesTags: [tagTypes.cart],
    }),
    getCartById: builder.query({
      query: (id) => `/cart/${id}`,
      providesTags: [tagTypes.cart],
    }),
    addCart: builder.mutation({
      query: (info) => {
        return {
          url: "/carts",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),
    editCart: builder.mutation({
      query: (info) => {
        return {
          url: `/cart/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),
    deleteCart: builder.mutation({
      query: (id) => {
        return {
          url: `/cart/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});
export const {
  useGetCartsQuery,
  useAddCartMutation,
  useDeleteCartMutation,
  useEditCartMutation,
  useGetCartByIdQuery,
  useGetSingleUserCartsQuery,
} = cartApi;
