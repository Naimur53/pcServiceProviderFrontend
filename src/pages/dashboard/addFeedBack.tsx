import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import DashboardLayout from "@/layout/DashboardLayout";
import { useAddFaqMutation } from "@/redux/features/faq/faqApi";
import { useAddFeedbackMutation } from "@/redux/features/feedback/feedbackApi";
import React from "react";
import { toast } from "react-toastify";
type Props = {};

const AddFeedBack = (props: Props) => {
  const [addFeedBack, { isLoading }] = useAddFeedbackMutation();
  const onSubmit = (data: any) => {
    addFeedBack(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log(res.error);
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
    <DashboardLayout>
      <h1 className="dashboard-title">Give Feedback</h1>
      <div>
        <Form submitHandler={onSubmit}>
          <div className="grid grid-cols-1 gap-2 mt-10">
            <div>
              <FormInput
                name="title"
                required={true}
                placeholder="Enter title"
              />
            </div>

            <div>
              <FormTextArea
                name="comment"
                rows={5}
                required={true}
                placeholder="Your feed back"
              ></FormTextArea>
            </div>
          </div>
          <button
            disabled={isLoading}
            className="bg-blue-400 mt-5 px-4 py-2 rounded text-white"
          >
            Submit
          </button>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default AddFeedBack;
