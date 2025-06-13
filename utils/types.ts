export type AppFormItems = {
  tag: string;
  type: string;
  value: any;
  placeholder?: string;
  securePassword?: boolean;
  label?: string;
  icon?: string;
  maxFile?: number;
  maxFileSize?: number;
  optional?: boolean;
};

export type CreateEventState = {
  title: string;
  description: string;
  date: {
    start: string;
    end: string;
  };
  time: {
    start: string;
    end: string;
  };
  location: string;
  coverPicture: File[];
};

export type GetEventsResponse = {
  events: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    coverPictureUrl: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};
