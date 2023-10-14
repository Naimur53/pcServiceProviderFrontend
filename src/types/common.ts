export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  contactNo: string;
  address: string;
  role: UserRole;
  profileImg: string | null;
}

export enum UserRole {
  Customer = "customer",
  Admin = "admin",
  SuperAdmin = "superAdmin",
}
