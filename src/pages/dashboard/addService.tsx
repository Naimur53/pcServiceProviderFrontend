import AdminLayout from "@/layout/AdminLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useEffect } from "react";
import { Button, Space, message } from "antd";
import {
  useAddPcServiceMutation,
  useGetPcServiceQuery,
} from "@/redux/features/pcService/pcServiceApi";
import { toast } from "react-toastify";
import AddServiceForm from "@/components/Forms/AddServiceForm";

type Props = {};

const AddService = (props: Props) => {
  const [addService, { isLoading, isError, isSuccess, error }] =
    useAddPcServiceMutation();

  const onSubmit = async (data: any) => {
    addService(data)
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

  useEffect(() => {
    if (isError && error) {
      toast.error("Failed to create");
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <>
      <AdminLayout>
        <div>
          <h2 className="text-center text-xl font-bold">Add a Service </h2>
          <div className="mt-5">
            <AddServiceForm
              isLoading={isLoading}
              onSubmit={onSubmit}
            ></AddServiceForm>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AddService;
