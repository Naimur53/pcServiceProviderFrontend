import { useDeleteFaqMutation } from "@/redux/features/faq/faqApi";
import { useDeleteFeedbackMutation } from "@/redux/features/feedback/feedbackApi";
import { IFeedback } from "@/types/common";
import { Avatar, Popconfirm } from "antd";
import React from "react";
import { toast } from "react-toastify";

type Props = {} & IFeedback;

const FeedbackCard = ({ id, title, comment, user }: Props) => {
  const [deleteFeedback, { isLoading }] = useDeleteFeedbackMutation();
  let content = null;
  if (user?.id) {
    content = (
      <div className="flex gap-2 mt-4">
        <Avatar size={"large"} src={user.profileImg}></Avatar>
        <div className="text-sm ">
          <h6>{user.name}</h6>
          <p>{user.email}</p>
        </div>
      </div>
    );
  }
  const handleDelete = () => {
    deleteFeedback(id)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.error) {
          toast.error("something went wrong");
        } else {
          toast.success("success");
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  return (
    <div className="shadow-xl rounded-lg p-5">
      <div>
        <h1 className="text-xl font-bold capitalize">{title}</h1>
        <p>{comment}</p>
      </div>
      {content}
      <div className="flex justify-end">
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={handleDelete}
          placement="leftTop"
          okButtonProps={{
            className: "!border !border-blue-300 text-blue-500",
          }}
        >
          <button
            disabled={isLoading}
            // onClick={}
            className="border border-red-300 px-3 leading-0 rounded-md  bg-red-500 transition-all text-white py-2 ml-2"
          >
            Delete
          </button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default FeedbackCard;
