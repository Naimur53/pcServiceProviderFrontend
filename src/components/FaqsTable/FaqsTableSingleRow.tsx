import { IFaq } from "@/types/common";
import { Input } from "antd";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useEditFaqMutation } from "@/redux/features/faq/faqApi";

type Props = {} & IFaq;

function FaqsTableSingleRow({ answer, createAt, id, question }: Props) {
  const [submitEditedFaq, { isLoading }] = useEditFaqMutation();
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
  return (
    <>
      <tr className="text-center">
        <td className="px-2">
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
        </td>
        <td className="px-2">
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
        </td>
        <td>
          {isEditing ? (
            <div className="flex gap-2 justify-center">
              <button
                disabled={isLoading}
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
            <button
              onClick={() => setIsEditing(true)}
              className="mr-2 text-blue-500"
            >
              Edit
            </button>
          )}
        </td>
      </tr>
    </>
  );
}

export default FaqsTableSingleRow;
