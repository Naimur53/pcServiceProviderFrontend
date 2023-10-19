import React from "react";
import { SubmitHandler } from "react-hook-form";
import FormInput from "./FormInput";
import FormInputNumber from "./FormInputNumber";
import FormSelectField from "./FormSelectField";
import FormTextArea from "./FormTextArea";
import Form from "./Form";
import { Button } from "antd";
import {
  ServiceAvailability,
  ServiceCategory,
  ServiceLocation,
} from "@/types/common";
import { optionCreator } from "@/utils";
import FormUploadImage from "./FormUploadImage";
import useFormUploadImage from "./useFormUploadImage";
import { toast } from "react-toastify";

type Props = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  defaultValues?: any;
};

const AddServiceForm = ({ onSubmit, isLoading, defaultValues }: Props) => {
  const categoryOption = Object.values(ServiceCategory).map(optionCreator);
  const locationOption = Object.values(ServiceLocation).map(optionCreator);
  const availabilityOption =
    Object.values(ServiceAvailability).map(optionCreator);

  const {
    handleChange,
    loading: imageUploadLoading,
    url,
    setUrl,
  } = useFormUploadImage(defaultValues?.thumbnail || undefined);

  const handleSubmit = (data: any) => {
    if (imageUploadLoading) {
      toast.error("please wait for img upload");
      return;
    }
    if (!url) {
      toast.error("Please select img");
      return;
    }
    onSubmit({ ...data, thumbnail: url });
    setUrl(null);
  };
  return (
    <div>
      <div>
        <div className="mt-5">
          <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
            <div className="grid gap-3  grid-cols-1 md:grid-cols-2 ">
              <div>
                <FormInput placeholder="Name" name="name" required={true} />
              </div>
              <div>
                {/* <FormInput
                  placeholder="Thumbnail"
                  name="thumbnail"
                  required={true}
                /> */}
                <FormUploadImage
                  loading={imageUploadLoading}
                  handleChange={handleChange}
                  imgUrl={url}
                  showImg={true}
                ></FormUploadImage>
              </div>

              <div>
                <FormInputNumber
                  placeholder="Price"
                  name="price"
                  required={true}
                ></FormInputNumber>
              </div>
              <div>
                <FormSelectField
                  placeholder="Select category"
                  name="category"
                  required={true}
                  options={categoryOption}
                ></FormSelectField>
              </div>
              <div>
                <FormSelectField
                  placeholder="Select availability"
                  name="availability"
                  required={true}
                  options={availabilityOption}
                ></FormSelectField>
              </div>
              <div>
                <FormSelectField
                  placeholder="Select location"
                  name="location"
                  required={true}
                  options={locationOption}
                ></FormSelectField>
              </div>
              <div>
                <FormTextArea placeholder="Description" name="description" />
              </div>
            </div>

            <Button
              danger
              disabled={isLoading}
              htmlType="submit"
              className="mt-3"
            >
              Add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;
