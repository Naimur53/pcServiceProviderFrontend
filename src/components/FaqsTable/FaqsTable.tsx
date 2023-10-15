import React from "react";

type Props = { children: React.ReactNode };

const FaqsTable = (props: Props) => {
  return (
    <div>
      <div className=" overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
          <tbody>{props.children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default FaqsTable;
