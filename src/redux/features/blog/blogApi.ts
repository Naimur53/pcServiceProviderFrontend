import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (query) => {
        return {
          url: `/blog?${query}`,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    getBlogById: builder.query({
      query: (id) => `/blog/${id}`,
    }),
    addBlog: builder.mutation({
      query: (info) => {
        return {
          url: "/blog",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.blog],
    }),
    editBlog: builder.mutation({
      query: (info) => {
        return {
          url: `/blog/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.blog],
    }),
    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});
export const {
  useGetBlogsQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useEditBlogMutation,
  useGetBlogByIdQuery,
} = blogApi;
