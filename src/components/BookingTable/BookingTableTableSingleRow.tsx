import { Booking, BookingStatus } from "@/types/common";
import Link from "next/link";
import React, { useState } from "react";
import FormSelectField, { SelectOptions } from "../Forms/FormSelectField";
import { optionCreator } from "@/utils";
import Form from "../Forms/Form";
import { Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEditBookingMutation } from "@/redux/features/booking/bookingApi";

type Props = {} & Booking;

const BookingTableTableSingleRow = ({
  id,
  userId,
  pcServiceId,
  scheduleDate,
  status,
  messageByAdmin,
  adjustedSchedule,
  address,
  createdAt,
  user,
  pcService,
}: Props) => {
  const [editBooking, { isLoading, isSuccess, isError }] =
    useEditBookingMutation();
  const [activeStatus, setActiveStatus] = useState<SelectOptions>({
    value: status,
    label: status,
  });
  const [newScheduleDate, setNewScheduleDate] = useState<dayjs.Dayjs | null>(
    adjustedSchedule ? dayjs(adjustedSchedule) : dayjs(scheduleDate)
  );

  const [newMessage, setNewMessage] = useState<string | null | undefined>(
    messageByAdmin
  );
  const [isEditAble, setIsEditAble] = useState(false);
  const statusOptions = Object.values(BookingStatus).map(optionCreator);

  const handleStatusChange = (el: string) => {
    setIsEditAble(true);
    setActiveStatus({ value: el, label: el });
  };
  const isDisabled = (): boolean => {
    if (isLoading) {
      return true;
    }
    if (
      status !== activeStatus.value ||
      newMessage !== messageByAdmin ||
      dayjs(scheduleDate) !== newScheduleDate
    ) {
      return false;
    }
    return true;
  };

  let dateContent = null;
  // Handle date selection
  const handleDateChange = (date: dayjs.Dayjs | null, dateString: string) => {
    setNewScheduleDate(date);
    console.log(date);
  };
  if (isEditAble) {
    const selectedDateJS = newScheduleDate ? newScheduleDate.toDate() : null;

    dateContent = (
      <DatePicker
        value={newScheduleDate ? dayjs(newScheduleDate) : null} // Convert to Dayjs
        onChange={handleDateChange}
        format="YYYY-MM-DD"
      />
    );
  } else if (adjustedSchedule) {
    dateContent = new Date(adjustedSchedule).toLocaleDateString();
  } else {
    dateContent = new Date(scheduleDate).toLocaleDateString();
  }

  const handleEdit = () => {
    const editInfo = {
      messageByAdmin: newMessage || null,
      adjustedSchedule:
        new Date(dayjs(newScheduleDate).toDate()).toISOString() || null,
      status: activeStatus.value,
      id,
    };
    console.log(editInfo);
    editBooking(editInfo);
  };
  return (
    <>
      <tr className="focus:outline-none h-16 border border-gray-300 mt-2 rounded">
        <td>
          <div className="ml-5">
            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
              <img
                className="w-[20px]"
                src={pcService?.thumbnail}
                alt="thumbnail"
              />
            </div>
          </div>
        </td>
        <td className="">
          <div>
            <Link
              className="flex items-center pl-5 hover:underline"
              href={`/service/${pcServiceId}`}
            >
              <p className="text-base font-medium leading-none text-gray-700 mr-2">
                {pcService?.name}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                  stroke="#3B82F6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                  stroke="#3B82F6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </td>
        <td>
          <div className="flex items-center gap-2">
            {user?.profileImg && (
              <img src={user.profileImg} className="w-[20px]" alt="user" />
            )}
            <div>
              <p className="text-sm leading-none text-gray-600 ml-2">
                {user?.name}
              </p>
            </div>
          </div>
        </td>
        <td>
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">{address}</p>
          </div>
        </td>
        <td>
          <div className="text-sm leading-none text-gray-600 ml-2">
            {dateContent}
          </div>
        </td>
        <td>
          <div className="flex items-center">
            {isEditAble ? (
              <Input
                type={"text"}
                placeholder="Enter message"
                value={newMessage || ""}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            ) : (
              <div className="text-sm leading-none text-gray-600 ml-2">
                {messageByAdmin || "No message"}
              </div>
            )}
          </div>
        </td>
        <td>
          <Form submitHandler={() => {}}>
            <FormSelectField
              name="status"
              handleChange={handleStatusChange}
              options={statusOptions}
              defaultValue={{ value: status, label: status }}
              value={activeStatus.value}
            ></FormSelectField>
          </Form>
        </td>
        <td>
          {!isEditAble ? (
            <button
              onClick={() => setIsEditAble(true)}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
            >
              Edit
            </button>
          ) : (
            <div>
              <button
                disabled={isDisabled()}
                onClick={handleEdit}
                className="grayscale-0 disabled:grayscale disabled:bg-blue-100 disabled:text-blue-600 leading-none text-blue-100 py-3 px-5 bg-blue-500 rounded hover:bg-blue-700 focus:outline-none mr-3"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditAble(false)}
                className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default BookingTableTableSingleRow;
