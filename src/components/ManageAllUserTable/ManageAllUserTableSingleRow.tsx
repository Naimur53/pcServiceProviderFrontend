import { useEditUserMutation } from "@/redux/features/user/userApi";
import { IUser } from "@/types/common";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
type Props = {} & IUser;

const ManageAllUserTableSingleRow = ({
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
  useEffect(() => {
    if (isSuccess) {
      toast.success("success");
    } else if (isError) {
      toast.error("something went wrong");
    }
  }, [isError, isSuccess]);
  console.log(error);
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
          <button
            disabled={isLoading}
            onClick={() => {
              editUser({ id, isBlocked: false });
            }}
            className="border border-green-300 px-3 leading-0 rounded-md text-green-400 hover:bg-green-500 transition-all hover:text-white py-2"
          >
            UnBlock
          </button>
        ) : (
          <button
            disabled={isLoading}
            onClick={() => {
              editUser({ id, isBlocked: true });
            }}
            className="border border-red-300 px-3 leading-0 rounded-md text-red-400 hover:bg-red-500 transition-all hover:text-white py-2"
          >
            Block
          </button>
        )}
      </td>
    </tr>
  );
};

export default ManageAllUserTableSingleRow;
