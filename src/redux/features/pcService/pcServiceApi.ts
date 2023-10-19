import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const pcServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPcService: builder.query({
      query: (query) => {
        return {
          url: `/pcService?${query}`,
        };
      },
      providesTags: [tagTypes.pcService],
    }),
    getPcServiceById: builder.query({
      query: (id) => `/pcService/${id}`,
    }),
    addPcService: builder.mutation({
      query: (info) => {
        return {
          url: "/pcService",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.pcService],
    }),
    editPcService: builder.mutation({
      query: (info) => {
        return {
          url: `/pcService/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.pcService],
    }),
    deletePcService: builder.mutation({
      query: (id) => {
        return {
          url: `/pcService/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.pcService],
    }),
  }),
});
export const {
  useGetPcServiceQuery,
  useAddPcServiceMutation,
  useDeletePcServiceMutation,
  useEditPcServiceMutation,
  useGetPcServiceByIdQuery,
} = pcServiceApi;
