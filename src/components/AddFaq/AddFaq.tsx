import { Modal } from "antd";
import React, { useState } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import FormTextArea from "../Forms/FormTextArea";
import { useAddFaqMutation } from "@/redux/features/faq/faqApi";
import Loading from "../Loading/Loading";

type Props = {};

function AddFaq({}: Props) {
  const [open, setOpen] = useState(false);
  const [addNewFaq, { isLoading, isSuccess, isError }] = useAddFaqMutation();
  const onSubmit = (data: { question: string; answer: string }) => {
    addNewFaq(data).then((res) => {
      setOpen(false);
    });
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-1 bg-blue-500 rounded font-bold  text-white"
      >
        Add Faq
      </button>

      <Modal
        title="Add new Faq"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form submitHandler={onSubmit}>
          <div className="flex flex-col gap-2 mt-5">
            <FormInput
              required={true}
              name="question"
              placeholder="Enter question"
            ></FormInput>
            <FormTextArea
              required={true}
              rows={4}
              name="answer"
              placeholder="Enter answer"
            ></FormTextArea>
          </div>
          <div className="flex justify-end">
            {isLoading ? (
              <Loading></Loading>
            ) : (
              <button className="px-4 bg-blue-500 text-white py-1 rounded mt-3">
                Add
              </button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AddFaq;
