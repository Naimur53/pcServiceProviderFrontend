import { apiSlice } from "../apiSlice/apiSlice";
export const pcServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPcService: builder.query({
      query: (query) => {
        return {
          url: `/pcService?${query}`,
        };
      },
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
    }),
    editPcService: builder.mutation({
      query: (info) => {
        return {
          url: `/pcService/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    deletePcService: builder.mutation({
      query: (id) => {
        return {
          url: `/pcService/${id}`,
          method: "DELETE",
        };
      },
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
