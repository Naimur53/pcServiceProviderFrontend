import AdminLayout from "@/layout/AdminLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import React from "react";
import { Button, Space, message } from "antd";
import { useGetPcServiceQuery } from "@/redux/features/pcService/pcServiceApi";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";

type Props = {};

const AddService = (props: Props) => {
  const { data } = useGetPcServiceQuery("limit=3");
  console.log(data);
  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
    try {
      console.log(data);
      //   await addDepartment(data);
      message.success("Department added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <DashboardLayout>
      <AdminLayout>
        <div>it admin layout</div>
        <Button>fdfd {data?.data?.length}</Button>
        <div>
          <h2 className="text-center text-xl font-bold">Add a Service </h2>
          <div className="mt-5">
            <Form submitHandler={onSubmit}>
              <FormInput name="s" />
            </Form>
          </div>
        </div>
      </AdminLayout>
    </DashboardLayout>
  );
};

export default AddService;
