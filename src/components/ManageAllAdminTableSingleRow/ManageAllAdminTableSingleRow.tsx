import { useEditUserMutation } from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { Popconfirm } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
type Props = {} & IUser;

const ManageAllAdminTableSingleRow = ({
  id,
  address,
  contactNo,
  email,
  name,
  password,
  profileImg,
  role,
  isBlocked,
}: Props) => {
  const [editUser, { isLoading, isError, isSuccess, error }] =
    useEditUserMutation();

  const handleRemove = () => {
    editUser({ id, role: UserRole.Customer })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.error) {
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
    <tr className="focus:outline-none text-center h-16 border border-gray-300 mt-2 rounded">
      <td className="pl-2">
        {profileImg ? <img src={profileImg} alt="user" /> : <div>No Img</div>}
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{contactNo}</td>
      <td>{role}</td>
      <td>
        {isBlocked ? (
          <span className="text-red-500 font-bold">Blocked</span>
        ) : (
          <Popconfirm
            title="Are you sure to remove admin?"
            onConfirm={handleRemove}
            placement="leftTop"
            description="you will lost all review, booking, feedback of this user"
            okButtonProps={{
              className: "!border !border-blue-300 text-blue-500",
            }}
          >
            <button
              disabled={isLoading}
              // onClick={}
              className="border border-red-300 px-3 leading-0 rounded-md  bg-red-500 transition-all text-white py-2 ml-2"
            >
              Remove
            </button>
          </Popconfirm>
        )}
      </td>
    </tr>
  );
};

export default ManageAllAdminTableSingleRow;
