import { IFaq } from "@/types/common";
import { Input, Popconfirm } from "antd";
import { toast } from "react-toastify";
import React, { useState } from "react";
import {
  useDeleteFaqMutation,
  useEditFaqMutation,
} from "@/redux/features/faq/faqApi";

type Props = {} & IFaq;

function FaqsTableSingleRow({ answer, createAt, id, question }: Props) {
  const [submitEditedFaq, { isLoading }] = useEditFaqMutation();
  const [deleteFaq, { isLoading: isDeleteLoading }] = useDeleteFaqMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedFaq, setEditedFaq] = useState({
    question,
    answer,
  });
  const handleSave = () => {
    if (!editedFaq.answer.length) {
      toast.error("Add question first");
      return;
    }
    if (!editedFaq.question.length) {
      toast.error("Add answer first");
      return;
    }
    submitEditedFaq({ ...editedFaq, id });
  };
  const handleDelete = () => {
    deleteFaq(id).catch((err) => {
      toast.error("Failed to delete");
    });
  };
  return (
    <>
      <tr className=" ">
        <td className="px-2">
          <div className="max-w-[300px] whitespace-pre-wrap">
            {isEditing ? (
              <Input
                type="text"
                value={editedFaq.question}
                defaultValue={question}
                placeholder="Enter Question"
                onChange={(e) =>
                  setEditedFaq({
                    ...editedFaq,
                    question: e.target.value,
                  })
                }
              />
            ) : (
              question
            )}
          </div>
        </td>
        <td className="px-2">
          <div className="max-w-[300px] whitespace-pre-wrap">
            {isEditing ? (
              <Input.TextArea
                value={editedFaq.answer}
                onChange={(e) =>
                  setEditedFaq({ ...editedFaq, answer: e.target.value })
                }
              />
            ) : (
              answer
            )}
          </div>
        </td>
        <td>
          {isEditing ? (
            <div className="flex gap-2 justify-center">
              <button
                disabled={isDeleteLoading || isLoading}
                onClick={() => {
                  handleSave();
                }}
                className="mr-2 text-blue-500"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-red-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={isDeleteLoading || isLoading}
                className="mr-2 text-blue-500"
              >
                Edit
              </button>
              <Popconfirm
                title="Are your Sure to delete this faq?"
                placement="leftTop"
                onConfirm={handleDelete}
                okButtonProps={{
                  className: "!border !border-blue-300 text-blue-500",
                }}
              >
                <button
                  disabled={isDeleteLoading}
                  className="border border-red-300 px-3 leading-0 rounded-md  bg-red-500 transition-all text-white py-2 ml-2"
                >
                  Delete
                </button>
              </Popconfirm>
            </>
          )}
        </td>
      </tr>
    </>
  );
}

export default FaqsTableSingleRow;
