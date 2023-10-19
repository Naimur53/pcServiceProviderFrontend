import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
interface props {
  handleChange: UploadProps["onChange"];
  loading: boolean;
  imgUrl?: string;
  showImg?: boolean;
}
const FormUploadImage: React.FC<props> = ({
  handleChange,
  loading,
  imgUrl,
  showImg,
}) => {
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:5000/api/v1/uploadImg"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {showImg ? (
          imgUrl ? (
            <img src={imgUrl} alt="" />
          ) : (
            uploadButton
          )
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default FormUploadImage;
