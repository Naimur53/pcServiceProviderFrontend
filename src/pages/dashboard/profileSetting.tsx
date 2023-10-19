import Form from "@/components/Forms/Form";
import useFormUploadImage from "@/components/Forms/useFormUploadImage";
import FormUploadImage from "@/components/Forms/FormUploadImage";
import Loading from "@/components/Loading/Loading";
import DashboardLayout from "@/layout/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React from "react";
import { Avatar, Input } from "antd";
import FormInput from "@/components/Forms/FormInput";
import { useEditUserMutation } from "@/redux/features/user/userApi";
import { toast } from "react-toastify";
import { IUser } from "@/types/common";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
type Props = {};

const ProfileSetting = (props: Props) => {
  const userInfo = useAppSelector((state) => state.user);
  const [editUser, { isLoading: isEditLoading }] = useEditUserMutation();
  const dispatch = useAppDispatch();
  const user = userInfo.user;

  const {
    handleChange,
    loading: imageUploadLoading,
    url,
  } = useFormUploadImage();

  if (!user) {
    return (
      <DashboardLayout>
        <Loading></Loading>
      </DashboardLayout>
    );
  }
  const { id, name, address, contactNo, email, profileImg } = user;
  const onSubmit = (data: any) => {
    if (imageUploadLoading) {
      toast.error("Please wait for image upload");
      return;
    }
    let info: Pick<
      IUser,
      "id" | "name" | "contactNo" | "address" | "profileImg"
    > = {
      id,
      name: data.name,
      contactNo: data.contactNo,
      address: data.address,
      profileImg: profileImg,
    };
    if (url) {
      info.profileImg = url;
    }
    editUser(info)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.error) {
          toast.error("something went wrong");
        } else {
          dispatch(
            userLoggedIn({
              accessToken: userInfo.accessToken,
              user: res.data,
            })
          );
          toast.success("success");
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  console.log({ url });
  return (
    <DashboardLayout>
      <div>
        <h1 className="dashboard-title mb-2">Profile Settings</h1>
        <div>
          <Form
            submitHandler={onSubmit}
            defaultValues={{
              name,
              email,
              contactNo,
              address,
            }}
          >
            <div className="flex gap-3">
              <div className="border-r-2 pr-5 ">
                {user.profileImg || url ? (
                  <Avatar
                    className="w-[120px] h-[120px] "
                    src={url || user?.profileImg}
                    alt=""
                  />
                ) : (
                  <></>
                )}
              </div>
              <div>
                <FormUploadImage
                  loading={imageUploadLoading}
                  handleChange={handleChange}
                  imgUrl={url}
                ></FormUploadImage>
              </div>
            </div>
            <h4 className="mt-10 font-bold text-xl">
              Change Profile Information
            </h4>
            <div className="grid-cols-1 md:grid-cols-2 mt-10 grid gap-5">
              <div>
                <FormInput
                  name="name"
                  required={true}
                  placeholder="name"
                ></FormInput>
              </div>
              <div>
                <Input
                  type="text"
                  disabled={true}
                  placeholder="email"
                  value={email}
                />
              </div>
              <div>
                <FormInput
                  name="contactNo"
                  required={true}
                  placeholder="Enter contact No"
                ></FormInput>
              </div>
              <div>
                <FormInput
                  name="address"
                  required={true}
                  placeholder="name"
                ></FormInput>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="px-4 py-1 rounded bg-blue-600 text-white"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSetting;
