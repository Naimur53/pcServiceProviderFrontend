import { PcService } from "@/types/common";
import { Modal } from "antd";
import React from "react";
import Form from "../Forms/Form";
import { useAppSelector } from "@/redux/hook";
import FormInput from "../Forms/FormInput";
import FormSelectDate from "../Forms/FormSelectDate";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useAddBlogMutation } from "@/redux/features/blog/blogApi";
import { useAddBookingMutation } from "@/redux/features/booking/bookingApi";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
} & PcService;

const BookingModal = ({ isOpen, setIsOpen, name, id: pcServiceId }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const [addBooking, { isLoading, isSuccess }] = useAddBookingMutation();
  const onSubmit = (data: any) => {
    if (!user?.id) {
      toast.error("user not found!");
      return;
    }
    const scheduleDate = dayjs(data.date).toISOString();
    addBooking({
      userId: user.id,
      pcServiceId,
      address: data.address,
      scheduleDate,
    })
      .unwrap()
      .catch((res) => {
        toast.error("Failed to booked");
      });
  };
  let content = null;
  if (!user) {
    content = (
      <div className="text-center text-red-600">Login First for booking</div>
    );
  } else if (isSuccess) {
    content = (
      <div className="flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="79"
          height="78"
          viewBox="0 0 79 78"
          fill="none"
        >
          <path
            d="M70.5699 34.9019L66.1499 29.7669C65.3049 28.7919 64.6224 26.9719 64.6224 25.6719V20.1469C64.6224 16.7019 61.7949 13.8744 58.3499 13.8744H52.8249C51.5574 13.8744 49.7049 13.1919 48.7299 12.3469L43.5949 7.92689C41.3524 6.00939 37.6799 6.00939 35.4049 7.92689L30.3024 12.3794C29.3274 13.1919 27.4749 13.8744 26.2074 13.8744H20.5849C17.1399 13.8744 14.3124 16.7019 14.3124 20.1469V25.7044C14.3124 26.9719 13.6299 28.7919 12.8174 29.7669L8.42986 34.9344C6.54486 37.1769 6.54486 40.8169 8.42986 43.0594L12.8174 48.2269C13.6299 49.2019 14.3124 51.0219 14.3124 52.2894V57.8469C14.3124 61.2919 17.1399 64.1194 20.5849 64.1194H26.2074C27.4749 64.1194 29.3274 64.8019 30.3024 65.6469L35.4374 70.0669C37.6799 71.9844 41.3524 71.9844 43.6274 70.0669L48.7624 65.6469C49.7374 64.8019 51.5574 64.1194 52.8574 64.1194H58.3824C61.8274 64.1194 64.6549 61.2919 64.6549 57.8469V52.3219C64.6549 51.0544 65.3374 49.2019 66.1824 48.2269L70.6024 43.0919C72.4874 40.8494 72.4874 37.1444 70.5699 34.9019ZM53.0199 32.8544L37.3224 48.5519C36.8653 49.0084 36.2458 49.2647 35.5999 49.2647C34.9539 49.2647 34.3344 49.0084 33.8774 48.5519L26.0124 40.6869C25.5591 40.2282 25.3048 39.6093 25.3048 38.9644C25.3048 38.3195 25.5591 37.7006 26.0124 37.2419C26.9549 36.2994 28.5149 36.2994 29.4574 37.2419L35.5999 43.3844L49.5749 29.4094C50.5174 28.4669 52.0774 28.4669 53.0199 29.4094C53.9624 30.3519 53.9624 31.9119 53.0199 32.8544Z"
            fill="#32A071"
          />
        </svg>
        <h2 className="font-semibold text-lg">Service successfully booked</h2>
        <p className="w-full md:w-[70%] text-center">
          Your order has been sent successfully wait for Admin confirmation
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="px-20 py-2 font-bold mt-4 bg-main-primary text-white rounded"
        >
          Ok
        </button>
      </div>
    );
  } else {
    content = (
      <Form
        submitHandler={onSubmit}
        defaultValues={{
          email: user.email,
          name: user.name,
          address: user.address,
        }}
      >
        <h3 className="text-center text-xl font-semibold mt-4 mb-2">
          Fill up Form for booking
        </h3>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <FormInput
              disabled={true}
              name="name"
              label="Your name"
            ></FormInput>
          </div>
          <div>
            <FormInput disabled={true} name="email" label="Email"></FormInput>
          </div>
          <div className="col-span-2">
            <FormInput name="address" label="Your Address"></FormInput>
          </div>
          <div className="col-span-2">
            <FormSelectDate
              required={true}
              name="date"
              label="Enter Schedule"
            ></FormSelectDate>
          </div>
        </div>
        <button
          className="px-4 py-2 font-semibold mt-4 bg-main-primary text-white rounded"
          type="submit"
        >
          Confirm
        </button>
      </Form>
    );
  }
  return (
    <>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title={`Booking for ${name}`}
        footer={null}
      >
        {content}
      </Modal>
    </>
  );
};

export default BookingModal;
