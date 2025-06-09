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
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  coverPictureUrl: string;
};
