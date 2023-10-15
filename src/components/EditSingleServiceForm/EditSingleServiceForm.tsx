import { PcService } from "@/types/common";
import React, { useEffect, useState } from "react";
import AddServiceForm from "../Forms/AddServiceForm";
import { useEditPcServiceMutation } from "@/redux/features/pcService/pcServiceApi";
import { toast } from "react-toastify";

type Props = {} & Omit<PcService, "Cart" | "reviews" | "bookings">;

const EditSingleServiceForm = ({
  id,
  availability,
  category,
  createdAt,
  description,
  location,
  name,
  price,
  thumbnail,
  updatedAt,
}: Props) => {
  const [value, setValue] = useState({
    availability,
    category,
    description,
    location,
    name,
    price,
    thumbnail,
  });
  const [edit, { isLoading, isError, isSuccess, error }] =
    useEditPcServiceMutation();
  const onSubmit = async (data: any) => {
    console.log(data);
    edit({ ...data, id });
    setValue(data);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to update");
      console.error(error);
    } else if (isSuccess) {
      toast.success("Successfully upload");
    }
  }, [isError, isSuccess, error]);
  return (
    <div>
      <AddServiceForm
        defaultValues={value}
        onSubmit={onSubmit}
        isLoading={isLoading}
      ></AddServiceForm>
    </div>
  );
};

export default EditSingleServiceForm;
