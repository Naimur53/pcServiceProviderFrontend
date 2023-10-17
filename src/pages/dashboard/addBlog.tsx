import BlogForm from "@/components/Forms/BlogForm";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import AdminLayout from "@/layout/AdminLayout";
import { useAddBlogMutation } from "@/redux/features/blog/blogApi";
import React from "react";
import { toast } from "react-toastify";

type Props = {};

const AddBlog = (props: Props) => {
  const [addBlog, { isLoading }] = useAddBlogMutation();

  const onSubmit = async (data: any) => {
    try {
      const res = await addBlog(data).unwrap();

      console.log({ res });
      if (res.success) {
        toast.success("Blog Published");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  return (
    <AdminLayout>
      <div>
        <h1 className="font-bold text-center text-lg">Write a Blog</h1>
        <div>
          <BlogForm onSubmit={onSubmit} isLoading={isLoading}></BlogForm>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddBlog;
