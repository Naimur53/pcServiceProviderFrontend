import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

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

export interface IFaq {
  id: string;
  question: string;
  answer: string;
  createAt: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  contactNo: string;
  address: string;
  role: UserRole;
  isBlocked?: Boolean;
  profileImg: string | null;
}
export interface IAllCategoryOfPcService {
  _count: {
    _all: number;
  };
  _min: {
    price: number;
    thumbnail: string;
  };
  category: string;
}

export enum UserRole {
  Customer = "customer",
  Admin = "admin",
  SuperAdmin = "superAdmin",
}

export enum ServiceCategory {
  COMPUTER_TROUBLESHOOTING = "COMPUTER_TROUBLESHOOTING",
  VIRUS_AND_MALWARE_REMOVAL = "VIRUS_AND_MALWARE_REMOVAL",
  DATA_RECOVERY = "DATA_RECOVERY",
  NETWORK_SETUP_AND_CONFIGURATION = "NETWORK_SETUP_AND_CONFIGURATION",
  SOFTWARE_INSTALLATION_AND_UPDATES = "SOFTWARE_INSTALLATION_AND_UPDATES",
  HARDWARE_UPGRADES = "HARDWARE_UPGRADES",
  CUSTOM_PC_BUILDING = "CUSTOM_PC_BUILDING",
  IT_CONSULTATION = "IT_CONSULTATION",
  SERVER_SETUP_AND_MAINTENANCE = "SERVER_SETUP_AND_MAINTENANCE",
  DATA_BACKUP_SOLUTIONS = "DATA_BACKUP_SOLUTIONS",
  REMOTE_IT_SUPPORT = "REMOTE_IT_SUPPORT",
  IT_SECURITY_AUDITS = "IT_SECURITY_AUDITS",
  CLOUD_COMPUTING_SERVICES = "CLOUD_COMPUTING_SERVICES",
  EMAIL_AND_COMMUNICATION_SYSTEMS = "EMAIL_AND_COMMUNICATION_SYSTEMS",
  HARDWARE_RECYCLING_AND_DISPOSAL = "HARDWARE_RECYCLING_AND_DISPOSAL",
}

export enum ServiceAvailability {
  TWENTY_FOUR_SEVEN = "TWENTY_FOUR_SEVEN",
  UNAVAILABLE = "UNAVAILABLE",
  CLOSED_ON_PUBLIC_HOLIDAYS = "CLOSED_ON_PUBLIC_HOLIDAYS",
}

export enum ServiceLocation {
  DHAKA = "DHAKA",
  CHITTAGONG = "CHITTAGONG",
  RAJSHAHI = "RAJSHAHI",
  KHULNA = "KHULNA",
  BARISAL = "BARISAL",
  SYLHET = "SYLHET",
  RANGPUR = "RANGPUR",
  ALL_OVER_BANGLADESH = "ALL_OVER_BANGLADESH",
}

export enum BookingStatus {
  PENDING = "PENDING",
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  COMPLETE = "COMPLETE",
  CANCELED = "CANCELED",
  // Add more status options as needed
}

export interface PcService {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  category: ServiceCategory;
  availability: ServiceAvailability;
  location: ServiceLocation;
  bookings?: Booking[];
  reviews?: Review[];
  Cart?: Cart[];
}

export interface Booking {
  id: string;
  userId: string;
  pcServiceId: string;
  scheduleDate: Date;
  status: BookingStatus;
  messageByAdmin?: string | null;
  adjustedSchedule?: Date | null;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
  pcService?: PcService;
}

export interface Review {
  id: string;
  userId: string;
  pcServiceId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
  pcService: PcService;
}

export interface Cart {
  id: string;
  userId: string;
  pcServiceId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
  pcService: PcService;
}

export interface IBlog {
  id: string;
  title: string;
  thumbnails: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}

export interface IFeedback {
  id: string;
  title: string;
  comment: string;
  userId: string;
  user?: IUser;
  createAt: string;
}
export interface INavItems {
  to: string;
  matchUrl: string;
  name: string;
  icon: IconDefinition;
}
