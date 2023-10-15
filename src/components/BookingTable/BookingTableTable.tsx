import React from "react";

type Props = { children: React.ReactNode };

const BookingTableTable = (props: Props) => {
  return (
    <>
      <div className=" overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <tr>
            <th>Thumbnail</th>
            <th>Service</th>
            <th>Buyer</th>
            <th>Address</th>
            <th>ScheduleDate</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tbody>{props.children}</tbody>
        </table>
      </div>
    </>
  );
};

export default BookingTableTable;
