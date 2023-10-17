import {
  useDeleteBlogMutation,
  useEditBlogMutation,
} from "@/redux/features/blog/blogApi";
import { IBlog } from "@/types/common";
import React, { useState } from "react";
import { toast } from "react-toastify";
import BlogForm from "../Forms/BlogForm";
import { Modal, Popconfirm } from "antd";

type Props = {} & IBlog;

const SingleDashboardBlogCard = ({
  content,
  createdAt,
  id,
  thumbnails,
  title,
  updatedAt,
}: Props) => {
  const [deleteBlog, { isLoading: isDeleteLoading }] = useDeleteBlogMutation();
  const [editBlog, { isLoading: isEditBlogLoading }] = useEditBlogMutation();
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => {
    deleteBlog(id)
      .then((res) => {
        toast.success("successfully deleted");
      })
      .catch((err) => {
        toast.error("Failed to delete");
      });
  };
  const onSubmit = (data: any) => {
    editBlog(data)
      .then((res) => {
        toast.success("successfully updated");
      })
      .catch((err) => {
        toast.error("Failed to update");
      });
  };
  return (
    <div className="shadow rounded-xl">
      <img src={thumbnails} className="w-full rounded-xl" alt="" />
      <div className="px-3 py-4 ">
        <h4 className="text-xl font-bold capitalize">{title}</h4>

        <div className="flex gap-4 mt-5">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-1 bg-blue-600 rounded text-white s"
          >
            Edit
          </button>
          <Popconfirm
            title="Are your Sure to delete this blog?"
            placement="leftTop"
            onConfirm={handleDelete}
            okButtonProps={{
              className: "!border !border-blue-300 text-blue-500",
            }}
          >
            <button className="px-4 py-1 border-red-600 text-red-600 rounded border">
              Delete
            </button>
          </Popconfirm>
          <Modal
            title="Update Blog"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
          >
            <BlogForm
              onSubmit={onSubmit}
              defaultValues={{ content, thumbnails, title }}
              isLoading={isDeleteLoading || isEditBlogLoading}
            ></BlogForm>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SingleDashboardBlogCard;
