import {
  useDeleteBookingMutation,
  useEditBookingMutation,
} from "@/redux/features/booking/bookingApi";
import { useAppSelector } from "@/redux/hook";
import { Booking, BookingStatus } from "@/types/common";
import { Modal, Popconfirm } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import FormSelectDate from "../Forms/FormSelectDate";
import AddReviewModal from "../AddReviewModal/AddReviewModal";

type Props = {} & Booking;

const OrdersCard = ({
  id,
  pcService,
  scheduleDate,
  adjustedSchedule,
  address,
  status,
  messageByAdmin,
  createdAt,
  pcServiceId,
}: Props) => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const [editBooking, { isLoading: isEditBlogLoading }] =
    useEditBookingMutation();
  const [deleteBooking, { isLoading }] = useDeleteBookingMutation();

  const handleDelete = () => {
    deleteBooking(id)
      .unwrap()
      .catch((err) => {
        toast.error("Failed to delete");
        console.log({ err });
      });
  };

  const onSubmit = (data: any) => {
    if (!user?.id) {
      toast.error("user not found!");
      return;
    }
    const scheduleDate = dayjs(data.date).toISOString();
    editBooking({
      id,
      address: data.address,
      scheduleDate,
      status: BookingStatus.PENDING,
    })
      .unwrap()
      .catch((res) => {
        toast.error("Failed to booked");
      });
  };

  return (
    <div className="shadow">
      <img
        src="https://images.unsplash.com/photo-1588632901974-5ae3618d967b?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcHV0ZXIlMjByZXBhaXJ8ZW58MHx8MHx8fDA%3D&w=1000"
        alt="product"
      />
      <div className="p-3">
        <h2 className=" text-xl font-bold">{pcService?.name}</h2>
        <h2>Price: ${pcService?.price}</h2>
        <div className="mt-3 flex justify-between">
          <div>
            <p className="inline-block"> Status: </p>
            <span className="px-4 py-1 leading-0 ml-2 font-bold text-sm rounded-xl bg-slate-400/30">
              {status}
            </span>
          </div>
          <div>
            <p className="inline-block">Order Date:</p>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <p>
            Your schedule date{" "}
            <span className="font-bold">
              {new Date(scheduleDate).toLocaleDateString()}
            </span>
          </p>
          {adjustedSchedule ? (
            <p>
              Schedule by Admin{" "}
              <span>{new Date(adjustedSchedule).toLocaleDateString()}</span>
            </p>
          ) : null}
        </div>
        {messageByAdmin ? (
          <div className="mt-4">
            <p>
              <span className="underline">Admin message:</span>
              <span
                className={`font-bold ml-1 ${
                  status === BookingStatus.REJECT ||
                  status === BookingStatus.CANCELED
                    ? "text-red-500"
                    : ""
                }`}
              >
                {messageByAdmin}
              </span>
            </p>
          </div>
        ) : null}
        <div className="flex justify-between mt-5">
          <Popconfirm
            title="Are you sure to delete ?"
            onConfirm={handleDelete}
            placement="leftTop"
            okButtonProps={{
              className: "!border !border-blue-300 text-blue-500",
            }}
          >
            <button
              disabled={isLoading}
              className="px-4 py-1 bg-red-600 text-white rounded "
            >
              Delete
            </button>
          </Popconfirm>
          {status === BookingStatus.CANCELED ||
          status === BookingStatus.COMPLETE ? (
            <></>
          ) : (
            <>
              <button
                onClick={() => setOpen(true)}
                className="px-4 py-1 bg-gray-500/30 rounded "
              >
                Edit
              </button>
              <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title={`Edit Booking for ${pcService?.name}`}
                footer={null}
              >
                <Form
                  submitHandler={onSubmit}
                  defaultValues={{
                    email: user?.email,
                    name: user?.name,
                    address: address,
                    scheduleDate: adjustedSchedule,
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
                      <FormInput
                        disabled={true}
                        name="email"
                        label="Email"
                      ></FormInput>
                    </div>
                    <div className="col-span-2">
                      <FormInput
                        name="address"
                        label="Your Address"
                      ></FormInput>
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
              </Modal>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center pb-3">
        <AddReviewModal pcServiceId={pcServiceId}></AddReviewModal>
      </div>
    </div>
  );
};

export default OrdersCard;
