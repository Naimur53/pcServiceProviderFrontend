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

type Props = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  defaultValues?: object;
};

const AddServiceForm = ({ onSubmit, isLoading, defaultValues }: Props) => {
  const categoryOption = Object.values(ServiceCategory).map(optionCreator);
  const locationOption = Object.values(ServiceLocation).map(optionCreator);
  const availabilityOption =
    Object.values(ServiceAvailability).map(optionCreator);
  return (
    <div>
      <div>
        <div className="mt-5">
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="grid gap-3 grid-cols-2 ">
              <div>
                <FormInput placeholder="Name" name="name" required={true} />
              </div>
              <div>
                <FormInput
                  placeholder="Thumbnail"
                  name="thumbnail"
                  required={true}
                />
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
