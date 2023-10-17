import React from "react";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import Form from "./Form";

type Props = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  defaultValues?: object;
};

const BlogForm = ({ onSubmit, defaultValues, isLoading }: Props) => {
  return (
    <div>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className="grid grid-cols-2 gap-2 mt-10">
          <div>
            <FormInput name="title" required={true} placeholder="Enter title" />
          </div>
          <div>
            <FormInput
              name="thumbnails"
              required={true}
              placeholder="Enter thumbnail"
            />
          </div>
          <div className="col-span-2">
            <FormTextArea
              name="content"
              rows={5}
              required={true}
              placeholder="Contents"
            ></FormTextArea>
          </div>
        </div>
        <button
          disabled={isLoading}
          className="bg-blue-400 mt-5 px-4 py-2 rounded text-white"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default BlogForm;
