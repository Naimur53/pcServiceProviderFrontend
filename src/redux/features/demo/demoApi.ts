import { apiSlice } from "../apiSlice/apiSlice";
export const pcServiceProviderFrontendApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPcServiceProviderFrontends: builder.query({
      query: (query) => {
        return {
          url: `/pcServiceProviderFrontends?${query}`,
        };
      },
    }),
    getPcServiceProviderFrontendById: builder.query({
      query: (id) => `/pcServiceProviderFrontends/${id}`,
    }),
    addPcServiceProviderFrontend: builder.mutation({
      query: (info) => {
        return {
          url: "/pcServiceProviderFrontends",
          method: "POST",
          body: info,
        };
      },
    }),
    editPcServiceProviderFrontend: builder.mutation({
      query: (info) => {
        return {
          url: `/pcServiceProviderFrontends/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    deletePcServiceProviderFrontend: builder.mutation({
      query: (id) => {
        return {
          url: `/pcServiceProviderFrontends/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetPcServiceProviderFrontendsQuery,
  useAddPcServiceProviderFrontendMutation,
  useDeletePcServiceProviderFrontendMutation,
  useEditPcServiceProviderFrontendMutation,
  useGetPcServiceProviderFrontendByIdQuery,
} = pcServiceProviderFrontendApi;
