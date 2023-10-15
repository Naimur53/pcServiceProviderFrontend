import React, { useMemo, useState } from "react";
import Table from "../BookingTable/BookingTableTable";
import { Button } from "antd";
import TableSingleRow from "../BookingTable/BookingTableTableSingleRow";
import {
  useGetBookingByIdQuery,
  useGetBookingsQuery,
} from "@/redux/features/booking/bookingApi";
import Loading from "../Loading/Loading";
import ErrorCompo from "../ErrorCompo/ErrorCompo";
import { Booking, BookingStatus, ServiceCategory } from "@/types/common";
import FormSelectField, { SelectOptions } from "../Forms/FormSelectField";
import { optionCreator } from "@/utils";
import Form from "../Forms/Form";

type Props = {};

const AllBookingTable = (props: Props) => {
  const defaultValue = {
    value: "",
    label: "",
  };
  const [activeStatus, setActiveStatus] = useState<SelectOptions>(defaultValue);

  const [sort, setSort] = useState<SelectOptions>(defaultValue);
  const queryString = useMemo(() => {
    const info = {
      status: activeStatus.value.length ? activeStatus.value : undefined,

      sort: sort.value.length ? sort.value : undefined,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value: string | undefined = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [activeStatus, sort]);
  console.log({ queryString });

  const { data, isFetching, isError, isLoading, isSuccess } =
    useGetBookingsQuery(queryString);

  let content = null;
  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data.data.length) {
    const info = data.data as Booking[];
    content = (
      <Table>
        {info.map((single) => (
          <TableSingleRow key={single.id} {...single}></TableSingleRow>
        ))}
      </Table>
    );
  } else {
    content = <ErrorCompo error="No Booking Found!"></ErrorCompo>;
  }

  const handleStatusChange = (el: string) => {
    setActiveStatus({ value: el, label: el });
  };
  const handleSortChange = (el: string) => {
    setSort({ value: el, label: el });
  };
  const statusOptions = Object.values(BookingStatus).map(optionCreator);
  const categoryOption = Object.values(ServiceCategory).map(optionCreator);

  return (
    <div>
      <div className=" w-full">
        {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
        <div className=" ">
          <div className="flex items-center justify-between">
            <p
              tabIndex={0}
              className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 text-center"
            >
              Bookings
            </p>
          </div>
        </div>
        <div className="mt-5 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-5 justify-between">
            <div className="flex gap-4">
              <div className="w-[150px] ">
                <Form submitHandler={() => {}}>
                  <FormSelectField
                    name="status"
                    handleChange={handleStatusChange}
                    placeholder="Filter By Status"
                    options={statusOptions}
                    value={activeStatus.value}
                  ></FormSelectField>
                </Form>
              </div>
              <Form submitHandler={() => {}}>
                <FormSelectField
                  name="category"
                  handleChange={handleSortChange}
                  placeholder="Short By booking time"
                  options={[
                    { value: "asc", label: "Sort By Latest" },
                    { value: "desc", label: "Sort By Oldest" },
                  ]}
                  value={sort.value}
                ></FormSelectField>
              </Form>
            </div>
            <div>
              <button
                className="px-4 py-2 bg-blue-500 text-white leading-0 rounded"
                onClick={() => {
                  setActiveStatus(defaultValue);
                  setSort(defaultValue);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default AllBookingTable;
