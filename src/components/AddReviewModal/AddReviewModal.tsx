import { Modal, Rate } from "antd";
import React, { useState } from "react";
import Form from "../Forms/Form";
import FormTextArea from "../Forms/FormTextArea";
import { useAddReviewMutation } from "@/redux/features/review/reviewApi";
import { toast } from "react-toastify";

type Props = {
  pcServiceId: string;
};

const AddReviewModal = ({ pcServiceId }: Props) => {
  const [addReview, { isLoading }] = useAddReviewMutation();
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const onSubmit = (data: any) => {
    addReview({
      pcServiceId,
      comment: data.comment,
      rating: rate,
    })
      .unwrap()
      .then((res) => {
        if (res.error) {
          toast.error("something went wrong");
        } else {
          toast.success("Thanks for  your rating ");
        }
        setOpen(false);
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  return (
    <div>
      <button onClick={() => setOpen(true)} className="underline">
        Add Review
      </button>
      <Modal
        onCancel={() => setOpen(false)}
        footer={null}
        open={open}
        title="Leave a Review"
      >
        <Form submitHandler={onSubmit}>
          <div>
            <div className=" flex justify-center">
              <div className="mb-3 p-4 shadow-xl border">
                <Rate
                  value={rate}
                  onChange={(value) => {
                    setRate(value);
                  }}
                ></Rate>
              </div>
            </div>
            <div>
              <FormTextArea
                required={true}
                name="comment"
                placeholder="Your review"
              ></FormTextArea>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-1 rounded bg-main-primary text-white"
          >
            Submit
          </button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddReviewModal;
